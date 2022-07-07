export const getErr = (errMsg = "server err", code = 500) => {
    return {
        code: code,
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

// 解决express异步异常
export const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            const result = await handler(req, res, next);
            res.send(getResult(result));
        } catch (error) {
            res.send(error);
        }
    }
}