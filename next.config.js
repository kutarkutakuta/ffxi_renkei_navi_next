const isProd = process.env.NODE_ENV === 'production';
const withPWA = require('next-pwa')({
  dest: 'public',
  // disable PWA in development to avoid GenerateSW being called multiple times
  disable: !isProd,
  // helpful defaults
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  reactStrictMode: true,
});