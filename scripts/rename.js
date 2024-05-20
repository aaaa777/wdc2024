const fs = require("fs");
const path = require("path");

const dir = "./out"; // ← 変更してね
const modTail = ".html.txt"; // ← 変更してね
const fileNameList = fs.readdirSync(dir);
const targetFileNames = fileNameList.filter(RegExp.prototype.test, /.*\.txt$/); // ← 変更してね
// console.log(targetFileNames);

targetFileNames.forEach(fileName => {
  // console.log(fileName)
  const filePath = {};
  const newName = fileName.replace(/\.txt$/, modTail);
  filePath.before = path.join(dir, fileName);
  filePath.after = path.join(dir, newName);
  // console.log(filePath);
  fs.copyFileSync(filePath.before, filePath.after);
  console.log(filePath.before + "-->" + filePath.after);
});
