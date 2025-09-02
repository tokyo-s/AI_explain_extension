module.exports = {
  verbose: true,
  build: {
    overwriteDest: true,
  },
  ignoreFiles: [
    'package.json',
    'package-lock.json',
    'web-ext-config.js',
    'create_icons.py',
    '*.xpi',
    '*.zip',
    'node_modules',
    '.git',
    'build.bat',
    'README.md'
  ],
};