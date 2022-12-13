import { decorateWithBylines } from './fetchStoryData';

describe('store/actions/fetchStoryData', () => {
  describe('decorateBylines', () => {
    test('should add bylines prop w/ null value', () => {
      const result = decorateWithBylines({
        id: '1337',
        type: 'node--stories',
        byline: null,
        bylines: null
      });

      expect(result).toHaveProperty('bylines');
      expect(result.bylines).toBeNull();
    });

    test('should add bylines prop w/ "By" credits', () => {
      const result = decorateWithBylines({
        id: '1337',
        type: 'node--stories',
        byline: [
          {
            id: '2345',
            type: 'node--people',
            title: 'John Doe'
          }
        ],
        bylines: null
      });

      expect(result).toHaveProperty('bylines');
      expect(result.bylines[0][0]).toEqual('By');
      expect(result.bylines[0][1]).toBeInstanceOf(Array);
      expect(result.bylines[0][1][0].id).toEqual('2345');
    });

    test('should add bylines prop w/ "By" credits using old byline model, before API update', () => {
      const result = decorateWithBylines({
        id: '1337',
        type: 'node--stories',
        byline: [
          {
            id: '4321',
            creditType: { title: 'By' },
            person: {
              id: '2345',
              type: 'node--people',
              title: 'John Doe'
            }
          }
        ]
      });

      expect(result).toHaveProperty('bylines');
      expect(result.bylines[0][0]).toEqual('By');
      expect(result.bylines[0][1]).toBeInstanceOf(Array);
      expect(result.bylines[0][1][0].id).toEqual('2345');
    });

    test('should add bylines prop w/ "By" credits using old byline model', () => {
      const result = decorateWithBylines({
        id: '1337',
        type: 'node--stories',
        byline: null,
        bylines: [
          {
            creditType: { title: 'By' },
            person: {
              id: '2345',
              type: 'node--people',
              title: 'John Doe'
            }
          }
        ]
      });

      expect(result).toHaveProperty('bylines');
      expect(result.bylines[0][0]).toEqual('By');
      expect(result.bylines[0][1]).toBeInstanceOf(Array);
      expect(result.bylines[0][1][0].id).toEqual('2345');
    });

    test('should add bylines prop w/ "By" credits uniquely combining byline props', () => {
      const result = decorateWithBylines({
        id: '1337',
        type: 'node--stories',
        byline: [
          {
            id: '2345',
            type: 'node--people',
            title: 'John Doe'
          }
        ],
        bylines: [
          {
            creditType: { title: 'By' },
            person: {
              id: '2345',
              type: 'node--people',
              title: 'John Doe'
            }
          },
          {
            creditType: { title: 'By' },
            person: {
              id: '3456',
              type: 'node--people',
              title: 'Jane Doe'
            }
          },
          {
            creditType: { title: 'Produced by' },
            person: {
              id: '3456',
              type: 'node--people',
              title: 'Jane Doe'
            }
          }
        ]
      });

      expect(result).toHaveProperty('bylines');
      expect(result.bylines.length).toEqual(2);
      expect(result.bylines[0][0]).toEqual('By');
      expect(result.bylines[0][1]).toBeInstanceOf(Array);
      expect(result.bylines[0][1].length).toEqual(2);
      expect(result.bylines[0][1][0].id).toEqual('2345');
      expect(result.bylines[0][1][1].id).toEqual('3456');
      expect(result.bylines[1][0]).toEqual('Produced by');
      expect(result.bylines[1][1]).toBeInstanceOf(Array);
      expect(result.bylines[1][1].length).toEqual(1);
      expect(result.bylines[1][1][0].id).toEqual('3456');
    });

    test('should add bylines prop w/ "By" credits using old byline model, missing creditType', () => {
      const result = decorateWithBylines({
        id: '1337',
        type: 'node--stories',
        byline: null,
        bylines: [
          {
            creditType: null,
            person: {
              id: '2345',
              type: 'node--people',
              title: 'John Doe'
            }
          }
        ]
      });

      expect(result).toHaveProperty('bylines');
      expect(result.bylines[0][0]).toEqual('By');
      expect(result.bylines[0][1]).toBeInstanceOf(Array);
      expect(result.bylines[0][1][0].id).toEqual('2345');
    });

    test('should add bylines prop w/ "By" credits using old byline model, keeping credits w/ person', () => {
      const result = decorateWithBylines({
        id: '1337',
        type: 'node--stories',
        byline: null,
        bylines: [
          {
            creditType: { title: 'By' },
            person: {
              id: '2345',
              type: 'node--people',
              title: 'John Doe'
            }
          },
          {
            creditType: { title: 'By' },
            person: null
          }
        ]
      });

      expect(result).toHaveProperty('bylines');
      expect(result.bylines[0][0]).toEqual('By');
      expect(result.bylines[0][1]).toBeInstanceOf(Array);
      expect(result.bylines[0][1].length).toEqual(1);
      expect(result.bylines[0][1][0].id).toEqual('2345');
    });
  });
});
