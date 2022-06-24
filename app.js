// module-1
// module-2
// module-3

import express from "express";
import  userRouter from "./routes/api/users";
import errorMiddleware from "./middleware/errorMiddleware";
import { sqlPool } from "./config/db";

  const sql = `CREATE TABLE users (
    id INT4 NOT NULL,
    LOGIN TEXT NOT NULL, -- 用户名（唯一）
    PASSWORD VARCHAR(255) NOT NULL, -- 用户密码
    AGE INT NOT NULL, -- 用户年龄
    IS_DELETED INT DEFAULT 0 NOT NULL, -- 是否被删除1 已删除,
    PRIMARY KEY(id)
  );`
  const sql2 = () => {return `select count(*) from pg_class where relname = 'users';`}
  sqlPool.connect((err) => {
    if(err) {
        return console.error('初始化数据库连接失败', err);
    }
    sqlPool.query(sql2()).then((res) => {
        const [{count}] = res.rows;
        if(count === '0') {
            sqlPool.query(sql);
            
            return console.log("users表创建成功")
        }
        return console.log("users表已存在", count)
    })
    .catch(err => {
        console.log("error====", err)
    });
})

const app = express();
const port = 5008;

app.use(express.json())
// user api
app.use(userRouter)

// 处理错误中间件
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`server is opened on ${port}`)
})