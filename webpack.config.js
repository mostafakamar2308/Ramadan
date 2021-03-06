const path = require("path");

module.exports = {
  entry: [
    "./src/index.js",
    "./src/firebase.js",
    "./src/quran.js",
    "./src/canvas.js",
  ],
  watch: true,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
