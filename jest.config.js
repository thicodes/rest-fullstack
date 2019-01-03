module.exports = {
  projects: ['<rootDir>/packages/web/jest.config.js'],
  transform: {
    '^.+\\.(js|ts|tsx)?$': require.resolve('babel-jest'),
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx'],
};
