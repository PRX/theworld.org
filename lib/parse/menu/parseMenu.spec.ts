import { parseMenu } from './index';

describe('lib/parse/menu', () => {
  describe('parseMenu', () => {
    const data = [
      {
        id: '1234',
        name: 'Foo',
        self: null,
        type: null,
        url: 'https://www.example.com/alias/path/foo',
        attributes: {
          title: 'Success',
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

    test('should have `name` property.', () => {
      expect(result[0]).toHaveProperty('name');
      expect(result[0].name).toEqual(data[0].name);
      expect(result[1]).toHaveProperty('name');
      expect(result[1].name).toEqual(data[1].name);
    });

    test('should have `title` value.', () => {
      expect(result[0]).toHaveProperty('title');
      expect(result[0].title).toEqual(data[0].attributes.title);
    });

    test('should have a `color` value.', () => {
      expect(result[0]).toHaveProperty('color');
      expect(result[0].color).toEqual('secondary');
    });

    test('should have a `icon` value.', () => {
      expect(result[0]).toHaveProperty('icon');
      expect(result[0].icon).toEqual('success');
    });

    test('should not have a `title` value.', () => {
      expect(result[1].title).toBeUndefined();
    });

    test('should not have a `color` value.', () => {
      expect(result[1].color).toBeNull();
    });

    test('should not have a `icon` value.', () => {
      expect(result[1].icon).toBeNull();
    });

    test('should have `children`.', () => {
      expect(result[1]).toHaveProperty('children');
      expect(result[1].children).not.toHaveLength(0);
      expect(result[1].children[0]).toHaveProperty('key');
      expect(result[1].children[0].key).toEqual(data[1].children[0].id);
      expect(result[1].children[0]).toHaveProperty('name');
      expect(result[1].children[0].name).toEqual(
        data[1].children[0].attributes.name
      );
      expect(result[1].children[0]).toHaveProperty('url');
      expect(result[1].children[0].url.href).toEqual(
        data[1].children[0].attributes.url
      );
    });
  });
});
