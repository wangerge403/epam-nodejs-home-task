// module-1
// module-2
// module-3
// module-4

import express from "express";
import  userRouter from "./routes/api/users";
import errorMiddleware from "./middleware/errorMiddleware"

const app = express();
const port = 5008;

// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(`Content-Type,Content-Length,
//      Authorization, Accept,X-Requested-With`);
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("X-Powered-By", '3.2.1');
//     if (req.method == "OPTIONS") res.send(200);
//     else next();
// });

app.use(express.json())
// user api
app.use(userRouter)

// 处理错误中间件
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`server is opened on ${port}`)
})