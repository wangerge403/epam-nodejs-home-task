const csv = require("csvtojson");
// const iconv = require("iconv-lite");
// const fs = require("fs");
import iconv from 'iconv-lite';
import fs from 'fs';
import path from 'path';

async function csvToJsonAndTxt() {

  const file_path = path.resolve(__dirname, "../static/2.csv");
  const file_name = path.resolve(__dirname, "../static/2.txt");
  const ws = fs.createWriteStream(file_name, {encoding: 'utf8'});

  await csv().fromFile(file_path).on('data', chunk => {
    // readStream
    const flag = ws.write(chunk);
    if(!flag) {
      csv().pause(); // 暂停读取
    }
  })

  // writeStream
  ws.on("drain", _ => {
    csv().resume();
  })

}

csvToJsonAndTxt()

/**
 * task 1.2
 * @param {*} file_path 
 */

// const file_path = path.resolve(__dirname, "../static/2.csv");
// const file_name = path.resolve(__dirname, "../static/2.txt");

// csv文件转json
// async function csvToJson (file_path) {
//   try {
//     const jsonObj = await csv().fromFile(file_path)
//     const jsonStr = JSON.stringify(jsonObj);
//     const buf = Buffer.from(jsonStr);
//     // 处理中文乱码问题
//     const arr = JSON.parse(iconv.decode(buf, 'utf8'));
//     // createTxt(arr);
//   } catch (err) {
//     console.log(err)
//   }
// }
/**
 * 创建txt文件
 * @param {*} arr 
 */

// const file_name = path.resolve(__dirname, "../static/2.txt");
// function createTxt (arr) {
//   // ws: writable的子类writeStream
//   const ws = fs.createWriteStream(file_name, {encoding: 'utf8'});
//   arr.forEach(row => {
//     ws.write("\r\n"); // 换行
//     ws.write(JSON.stringify(row));
//   });
  
//   ws.end();
// }
// csvToJson(file_path)