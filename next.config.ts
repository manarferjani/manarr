import type { Configuration as WebpackConfig } from 'webpack';
import type { NextConfig } from 'next';
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ajout ici
  },
  experimental: {
    turbo: {
      resolveAlias: {
        '@': path.resolve(__dirname),
        '@app': path.resolve(__dirname, 'app'),
        '@models': path.resolve(__dirname, 'models'),
        '@Backend': path.join(__dirname, '../Backend'),
        '@/hooks': path.resolve(__dirname, 'hooks'),
        '@/lib': path.resolve(__dirname, 'lib')
      }
    }
  },
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    // Provide polyfills for Node.js core modules in browser environment
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          path: false,
          os: false,
          crypto: false,
          stream: false,
          buffer: false,
          util: false,
          assert: false,
          process: false,
          ...(config.resolve?.fallback || {})
        }
      };
    }

    // Add aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@app': path.resolve(__dirname, 'app'),
      '@models': path.resolve(__dirname, 'models'),
      '@Backend': path.join(__dirname, '../Backend'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      '@/lib': path.resolve(__dirname, 'lib')
    };

    return config;
  }
};

export default nextConfig;
