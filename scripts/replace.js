#!/usr/bin/env node

const replace = require("replace-in-file");

const options = {
  files: [
    "./out/*.html",
    "./out/**/*.js",
    "./out/**/*.css",
  ], // 置換を実行したいファイルのパスを設定
  from: [
    /\/_next/g,
    /"\.\/"/g,
    /\"\.\/bozo-sort"/g,
    /\"\.\/bubble-sort"/g,
    /\"\.\/comb-sort"/g,
    /\"\.\/selection-sort"/g,
    /\"\.\/shaker-sort"/g,
    /crossorigin=""/g,
  ], // 置換対象の文字を正規表現で設定
  to: [
    "./_next",
    "\"\.\/index\.html\"",
    "\"\.\/bozo-sort\.html\"",
    "\"\.\/bubble-sort\.html\"",
    "\"\.\/comb-sort\.html\"",
    "\"\.\/selection-sort\.html\"",
    "\"\.\/shaker-sort\.html\"",
    "",
  ], // 置換後の文字を設定
};

const options2 = {
  files: [
    "./out/**/*.css",
  ], // 置換を実行したいファイルのパスを設定
  from: [
    // css font
    /\/_next\/static\/media/g,
  ], // 置換対象の文字を正規表現で設定
  to: [
    // css font
    "../media",
  ], // 置換後の文字を設定
};
[options, options2].forEach((option) => {
  replace(option, (error, changedFiles) => {
    if (error) return console.error("Error occurred:", error);
    for (let i = 0; i < changedFiles.length; i++) {
      console.log("Modified files:", changedFiles[i].file); // 変更したファイル名をログに出力
    }
  });
});