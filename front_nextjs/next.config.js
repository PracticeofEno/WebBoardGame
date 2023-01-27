// next.config.js
const rewrites = async () => {
  return [
    {
      source: "/api/:path*",
      destination: "http://119.194.118.155:5000/:path*",
    },
  ];
};

module.exports = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  rewrites,
};
