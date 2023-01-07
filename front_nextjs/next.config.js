// next.config.js

const rewrites = async () => {
  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:5050/:path*",
    },
    {
      source: "/image/:path*",
      destination: "http://localhost:5050/images/:path*",
    }
  ];
};

module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  rewrites
};
