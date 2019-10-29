/**
 * @file denormalize.js
 * Exports methods that assist in the denormalization of JSON-API responses.
 */

import relate from 'jsonapi-relate';
import camelcase from 'camel-case';

/**
 * Formats property names.
 *
 * @param {string} name - Name of property to be normalized.
 *
 * @returns {string} - Normalized property name.
 */
const formatPropertyName = name => {
  // Remove all instances of 'field', it's not usefull.
  const normalized = name.replace('field', '');

  // Camelcase property name and return.
  return camelcase(normalized);
};

/**
 * Takes a list of keys, an item, and returns a key for that item.
 *
 * @param {object} item = Item for which a key will be calculated.
 * @param {object} keys - Object who's keys refer to relationship types, and
 *                        values refer to a property on the related object that
 *                        should become the key on the parsed resonse.
 *
 * @returns {string} - Key for item.
 */
const formatKey = (keys, item) => {
  const key = keys[item.type] || keys['*'];
  return key ? item.attributes[key] : `${item.type}-${item.id}`;
};

/**
 * Denormalizes a single JSON-API resonse object.
 *
 * @param {object} jsonapi - Un-altered JSON-API response data.
 * @param {object} item = Item to be denormalized.
 * @param {object} keys - Object who's keys refer to relationship types, and
 *                        values refer to a property on the related object that
 *                        should become the key on the parsed resonse.
 *
 * @returns {object} - Denormalized item.
 */
const denormalizeItem = (jsonapi, item, keys) => {
  // If the input is invalid, throw an error.
  if (!jsonapi || !item) {
    throw new Error(
      'You must specify a jsonapi response, and item to denormalized.'
    );
  }

  const data = {...jsonapi};
  const dataItem = {...item};

  dataItem.attributes.type = item.type;
  dataItem.attributes.id = item.id;

  // If no items were included, then stub out an empty included property.
  data.included = data.included || [];

  // If no relationship items were included, then stub out an empty
  // relationship property.
  dataItem.relationships = dataItem.relationships || {};

  const newItem = {};

  // Normalize and add all attributes.
  Object.keys(dataItem.attributes).forEach(attr => {
    newItem[formatPropertyName(attr)] = dataItem.attributes[attr];
  });

  // Fetch relationships and attach them to the new item.
  Object.keys(dataItem.relationships).forEach(related => {
    const included = relate.getRelationship(data, dataItem, related);
    const isArray = Array.isArray(included);
    let output = isArray ? [] : null;

    // Output should be object if keys map was provided.
    if (keys) {
      output = {};
    }

    // If the item is not included, default output to the relationship data
    // property value, or null if even that does not exist.
    if (included == null || (isArray && included.every(val => val == null))) {
      output = dataItem.relationships[related].data || null;
    } else if (isArray) {
      // If the includes is an array of item, loop through and denormalize each
      // item.
      included.forEach((include, index) => {
        if (include) {
          const key = keys ? formatKey(keys, include) : index;
          output[key] = denormalizeItem(data, include, keys);
          output[key].id = include.id;
        }
      });
    } else {
      // If this is one single include, denornamlize and attach it.
      output = denormalizeItem(data, included, keys);
    }

    newItem[formatPropertyName(related)] = output;
  });
  return newItem;
};

/**
 * Denormalizes JSON-API response data.
 *
 * @param {object} jsonapi - Un-altered JSON-API response data.
 * @param {object} keys - Object who's keys refer to relationship types, and
 *                        values refer to a property on the related object that
 *                        should become the key on the parsed resonse.
 *
 * @returns {object} - Denormalized object that can be easily consumed.
 */
const denormalizeJsonApi = (jsonapi, keys) => {
  // If the input is invalid, throw an error.
  if (!jsonapi) {
    throw new Error('You must specify a jsonapi response to denormalize.');
  }

  // If the response is a message detailing a failed request, return the message
  // object as-is.
  if (jsonapi.status && jsonapi.status !== 200) {
    return jsonapi;
  }

  // Make sure data is always an array.
  const apiData = {...jsonapi};
  const isArray = Array.isArray(apiData.data);
  let output = isArray ? [] : null;

  // Output should be object if keys were provided.
  if (keys) {
    output = {};
  }

  if (isArray) {
    // Loop through each response item and denormalize.
    apiData.data.forEach((item, index) => {
      // Use appropriate key, or index if none provided.
      const key = keys ? formatKey(keys, item) : index;
      output[key] = denormalizeItem(apiData, item, keys);
      // output[key].id = item.id;
    });
  } else if (keys) {
    // Demoralize and map to appropriate key.
    const key = formatKey(keys, apiData.data);
    output[key] = denormalizeItem(apiData, apiData.data, keys);
  } else {
    // Just denormalize single item.
    output = denormalizeItem(apiData, apiData.data);
  }

  return output;
};

export { denormalizeJsonApi, denormalizeItem, formatPropertyName, formatKey };
