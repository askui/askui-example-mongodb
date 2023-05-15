const merge = require('merge');
const { defaults: tsJestPreset } = require('ts-jest/presets');
const jestMongodbPreset = require('@shelf/jest-mongodb/jest-preset');

module.exports = merge.recursive(tsJestPreset, jestMongodbPreset);
