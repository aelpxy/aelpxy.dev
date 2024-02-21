/** @type {import('next').NextConfig} */

const withNextra = require("nextra")({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.js",
});

// Next.js configurations
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = withNextra(nextConfig);
