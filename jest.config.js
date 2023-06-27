module.exports = {
  roots: ['<rootDir>'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '\\.tsx$': 'babel-jest',
    '\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/components$1',
    '^@config(.*)$': '<rootDir>/config$1',
    '^@contexts(.*)$': '<rootDir>/contexts$1',
    '^@interfaces(.*)$': '<rootDir>/interfaces$1',
    '^@lib(.*)$': '<rootDir>/lib$1',
    '^@store(.*)$': '<rootDir>/store$1',
    '^@styles(.*)$': '<rootDir>/styles$1',
    '^@svg(.*)$': '<rootDir>/assets/svg$1',
    '^@theme(.*)$': '<rootDir>/theme$1'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  }
};
