/** @type {import('next').NextConfig} */
const withNextra = require("nextra")({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.js",
  unstable_staticImage: true,
});

// Next.js configurations 
const nextConfig = {};

module.exports = withNextra(nextConfig);
