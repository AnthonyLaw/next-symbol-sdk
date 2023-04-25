const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // use a browser-optimized wasm for Ed25519 crypto operrations
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /symbol-crypto-wasm-node/,
        `../../../symbol-crypto-wasm-web/symbol_crypto_wasm.js`
      )
    );

    // enable async loading of wasm files
    config.experiments = { asyncWebAssembly: true, topLevelAwait: true, layers: true };

    return config;
  },
}

module.exports = nextConfig
