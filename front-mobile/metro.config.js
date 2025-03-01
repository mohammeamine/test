// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support
  isCSSEnabled: true,
});

// Add support for native wind and other assets
config.resolver.assetExts.push('cjs');
config.resolver.sourceExts.push('css');

module.exports = config;
