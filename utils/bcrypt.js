import bcrypt from 'bcrypt-nodejs'

/**
 * @func encrypt - 加密
 */
export const encrypt = password => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt ('', (err, salt) => {
            if (err) {
                reject(password)
            }
            bcrypt.hash(password, salt, null, (err, hash) => {
                if(err) {
                    resolve(err)
                }
                resolve(hash)
            })
        })
    })
}

/**
 * @func comparePassword 密码校验
 * @param {*} _password 需要校验的密码
 * @param {*} hash 加盐后的密码
 */
export const comparePassword = (_password, hash) => {
    return new Promise ((resolve, reject) => {
        bcrypt.compare(_password, hash, (err, isMatch) => {
            if (err) {
                reject(err)
            }
            resolve(isMatch)
        })
    })
}