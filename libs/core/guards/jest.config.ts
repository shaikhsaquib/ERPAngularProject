/* eslint-disable */
export default {
  displayName: 'core-guards',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/../../testing/src/lib/test-setup.ts'],
  coverageDirectory: '../../../coverage/libs/core/guards',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
