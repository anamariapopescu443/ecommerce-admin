import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains:[
      "res.cloudinary.com"
    ]
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use WatchIgnorePlugin instead of mutating read-only watchOptions
      const webpackLib = require("webpack");
      const pagefilePattern = /C:\\pagefile\.sys/i;
      config.plugins = config.plugins || [];
      config.plugins.push(new webpackLib.WatchIgnorePlugin({ paths: [pagefilePattern] }));
    }
    return config;
  }
};

export default nextConfig;
