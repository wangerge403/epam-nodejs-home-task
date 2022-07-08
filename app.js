// module-1
// module-2
// module-3
// module-4

import express from "express";
import  userRouter from "./routes/api/users";
import  groupRouter from "./routes/api/group";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();
const port = 5008;

app.use(express.json())
// user api & group api
app.use(userRouter).use(groupRouter)

// 处理错误
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`server is opened on ${port}`)
})