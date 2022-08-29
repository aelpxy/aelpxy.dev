/** @type {import('next').NextConfig} */
const withNextra = require("nextra")({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.js",
  unstable_staticImage: true,
});

const nextConfig = {};

module.exports = withNextra(nextConfig);
