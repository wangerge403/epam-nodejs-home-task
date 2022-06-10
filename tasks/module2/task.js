import express from "express";
import  userRouter from "../../routes/api/student";
import errorMiddleware from "../../middleware/errorMiddleware"

const app = express();
const port = 5008;


app.use(express.json())
// user api
app.use("api/user", userRouter)

// 处理错误中间件
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`server is opened on ${port}`)
})