import HttpException from '../exception';

export const validator = {
    isAge: (res) => {
        if (!res || !Number(res)) {
            throw new HttpException({
                code: 200001,
                message: "age必须是数字类型"
            })
        }
    },
    login: (res) => {
        throw new HttpException({
            code: 200003,
            message: "用户名必须是字符串类型"
        })
    },
    password: (res) => {
        throw new HttpException({
            code: 200005,
            message: "密码必须是字符串类型"
        })
    },

}