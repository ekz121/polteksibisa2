const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
// Batasi proses paralel agar pengembangan tetap ringan pada laptop RAM 8 GB.
config.maxWorkers = 2;

module.exports = config;
