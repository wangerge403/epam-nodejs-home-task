// module-1
// module-2
// module-3
// module-4

import express from "express";
import  userRouter from "./routes/api/users";
import  groupRouter from "./routes/api/group";
import errorMiddleware from "./middleware/errorMiddleware";
import ratelimit from 'koa-ratelimit';
import cors from '@koa/cors'

const app = express();
const port = 5008;

app.use(express.json())
// cros
app.use(cors)
// user api & group api
app.use(userRouter).use(groupRouter)

// 处理错误
app.use(errorMiddleware)

// Rate Limiter
app.use(ratelimit({
    driver: 'memory',
    db: new Map(),
    duration: 60000,
    errorMessage: '慢一点',
    id: (ctx) => ctx.ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total'
    },
    max: 100,
    disableHeader: false,
    whitelist: (ctx) => {
    return true
    },
    blacklist: (ctx) => {
      return true
    }
}))

app.listen(port, () => {
    console.log(`server is opened on ${port}`)
})