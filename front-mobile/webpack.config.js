const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@expo/vector-icons', 'nanoid']
    }
  }, argv);

  // Add resolve alias for nanoid
  config.resolve.alias = {
    ...config.resolve.alias,
    'nanoid/non-secure': require.resolve('nanoid/non-secure')
  };

  return config;
};
