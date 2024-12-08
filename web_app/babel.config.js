const isTest = process.env.NODE_ENV === "test";
module.exports = {
  presets: isTest
    ? ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
    : [],
};