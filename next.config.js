const isProd = process.env.NODE_ENV === 'production';
const withPWA = require('next-pwa')({
  dest: 'public',
  // disable PWA in development to avoid GenerateSW being called multiple times
  disable: !isProd,
  // helpful defaults
  register: true,
  skipWaiting: false,
  // document fallback（ネットワーク失敗時に index を返す）
  fallbacks: {
    document: '/index.html',
  },
  // 追加で startUrl をプリキャッシュ（もし必要なら）
  buildExcludes: [],
})

module.exports = withPWA({
  reactStrictMode: true,
});