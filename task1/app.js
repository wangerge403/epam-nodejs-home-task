/**
 * task 1.2
 * 转utf-8
 */
const csv = require("csvtojson");
const iconv = require("iconv-lite");

const csvFilePath = "./static/test.csv";

async function csvToJson(){
    const jsonObj = await csv().fromFile(csvFilePath)
    const jsonStr = JSON.stringify(jsonObj);
    // // 转buf
    const buf = Buffer.from(jsonStr);
    // // 处理中文乱码问题
    const res = iconv.decode(buf, "gbk");

    console.log("=========+++++结果", res)
    const csvStr = `first_name,last_namejohn,smithjane,smith`;
    const jsonObj1 = await csv().fromString(csvStr)

    console.log("+++++++++++", jsonObj1);
}


csvToJson()
