// module-1
// module-2
// module-3
// module-4

import express from "express";
import  userRouter from "./routes/api/users";
import errorMiddleware from "./middleware/errorMiddleware";

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