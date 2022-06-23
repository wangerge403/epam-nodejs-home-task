export const validator = {
    isAge: ({send}, res) => {
        if (!res || !Number(res)) {
            send({
                code: 100001,
                message: "age必须是数字类型"
            })
        }
    },
    login: (res) => {
        this.send({
            code: 100003,
            message: "用户名必须是字符串类型"
        })
    },
    password: (res) => {
        this.send({
            code: 100005,
            message: "密码必须是字符串类型"
        })
    },

}