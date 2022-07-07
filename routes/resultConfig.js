export const getErr = (errMsg = "server err", errCode = 500) => {
    return {
        code: errCode,
        message: errMsg
    }
}

export const getResult = (result) => {
    return {
        code: 0,
        message: "success",
        data: result
    }
}

// 解决express异步报错
export const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            const result = await handler(req, res, next);
            res.send(getResult(result));
        } catch (error) {
            next(err);
        }
    }
}