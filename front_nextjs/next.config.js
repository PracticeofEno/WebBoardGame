// next.config.js

const rewrites = async () => {
  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:5050/:path*"
    },
  ];
};

module.exports = { rewrites };