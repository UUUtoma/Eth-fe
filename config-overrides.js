const { override, addWebpackAlias, addDecoratorsLegacy, addPostcssPlugins } = require("customize-cra")
const path = require('path')

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
    // "@common": path.resolve(__dirname, "src/common"),
  }),
  addDecoratorsLegacy(),
  addPostcssPlugins([require("tailwindcss"), require("autoprefixer")]),
);
