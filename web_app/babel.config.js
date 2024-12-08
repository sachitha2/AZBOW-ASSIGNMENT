const isTest = process.env.NODE_ENV === "test";
console.log("hellow test")
console.log(isTest)
module.exports = {
  presets: isTest
    ? ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
    : [],
};