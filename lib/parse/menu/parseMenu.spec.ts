import parseMenu from './index';

describe(parseMenu, () => {
  const data = [
    {
      id: '1234',
      name: 'Foo',
      self: null,
      type: null,
      url: 'https://www.example.com/alias/path/foo',
      attributes: {
        class: ['btn-danger', 'icon-success']
      }
    },
    {
      id: '5678',
      name: 'Bar',
      self: null,
      type: null,
      url: 'https://www.example.com/alias/path/bar',
      attributes: {
        class: []
      },
      children: [
        {
          id: '8765',
          self: null,
          type: null,
          attributes: {
            name: 'Baz',
            url: 'https://www.example.com/alias/path/bar',
            attributes: []
          }
        }
      ]
    }
  ];
  const result = parseMenu(data);

  test('should return empty array.', () => {
    expect(parseMenu(null)).toStrictEqual([]);
  });

  test('should have `key` property with `id` value.', () => {
    expect(result[0]).toHaveProperty('key');
    expect(result[0].key).toEqual(data[0].id);
  });

  test('should have a `color` value.', () => {
    expect(result[0]).toHaveProperty('color');
    expect(result[0].color).toEqual('secondary');
  });

  test('should have a `icon` value.', () => {
    expect(result[0]).toHaveProperty('icon');
    expect(result[0].icon).toEqual('success');
  });

  test('should not have a `color` value.', () => {
    expect(result[1].color).toBeUndefined();
  });

  test('should not have a `icon` value.', () => {
    expect(result[1].icon).toBeUndefined();
  });

  test('should have `children`.', () => {
    expect(result[1]).toHaveProperty('children');
    expect(result[1].children).not.toHaveLength(0);
    expect(result[1].children[0]).toHaveProperty('key');
    expect(result[1].children[0].key).toEqual(data[1].children[0].id);
  });

});
