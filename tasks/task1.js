/**
 * task 1.1
 * @param {*} str 
 * @returns 
 */
// stdin and stdout
process.stdout.write("输入字符串")
process.stdin.on('data', (res) => { // stream
  // buffer存放二进制的缓存区
  // 转数字字符串
  // 数组反转，转字符串
  console.log(res.toString().split("").reverse().join(""))
})