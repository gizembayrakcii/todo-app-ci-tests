module.exports = {
  default: {
    require: [
      'frontend/feature/step-definitions/**/*.ts',
      'frontend/feature/support/world.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['progress'],
    paths: ['frontend/feature/**/*.feature']
  }
};
