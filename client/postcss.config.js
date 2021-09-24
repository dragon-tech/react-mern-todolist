// const tailwindcss = require("tailwindcss");

// module.exports = {
//   plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
// };

// module.exports = {
//   plugins: [require("tailwindcss"), require("autoprefixer")],
// };

module.exports = {
  plugins: [
    require("tailwindcss")("./tailwindcss-config.js"),
    require("autoprefixer"),
  ],
};
