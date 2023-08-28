const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  experimental   : {
    appDir       : true,
    serverActions: true,
  },
  eslint         : {
    ignoreDuringBuilds: true,
  },
  images         : {
    dangerouslyAllowSVG   : true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy : 'default-src \'self\'; script-src \'none\'; sandbox;',
    domains               : ['localhost', 'api-solsan.upwego.se'],
    formats               : ['image/webp'],
  },
})
