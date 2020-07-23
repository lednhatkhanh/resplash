const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optionalCatchAll: true,
    modern: true,
  },
});
