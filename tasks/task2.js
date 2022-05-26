const csv = require("csvtojson");
const iconv = require("iconv-lite");
const fs = require("fs");
// import iconv from 'iconv-lite';
// import fs from 'fs';
/**
 * task 1.2
 * @param {*} file_path 
 */

const file_path = "./static/2.csv";

// csv文件转json
async function csvToJson (file_path) {
  try {
    const jsonObj = await csv().fromFile(file_path)
    const jsonStr = JSON.stringify(jsonObj);
    const buf = Buffer.from(jsonStr);
    // 处理中文乱码问题
    const arr = JSON.parse(iconv.decode(buf, 'utf8'));
    createTxt(arr);
  } catch (err) {
    console.log(err)
  }
}

/**
 * 创建txt文件
 * @param {*} arr 
 */
function createTxt (arr) {
  const txt = fs.createWriteStream('./static/2.txt', {encoding: 'utf8'});
  arr.forEach(row => {
    txt.write("\r\n"); // 换行
    txt.write(JSON.stringify(row));
  });
  
  txt.end();
}
csvToJson(file_path)