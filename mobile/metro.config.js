const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
// Batasi proses paralel agar pengembangan tetap ringan pada laptop RAM 8 GB.
config.maxWorkers = 2;

// Cadangan lokal tidak termasuk kode yang perlu dipindai atau dipantau Metro.
const previousBlockList = config.resolver.blockList;
config.resolver.blockList = [
  ...(Array.isArray(previousBlockList) ? previousBlockList : previousBlockList ? [previousBlockList] : []),
  /[/\\]\.recovery[/\\]/,
];

module.exports = config;
