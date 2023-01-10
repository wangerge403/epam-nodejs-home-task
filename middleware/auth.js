import jwt from 'jsonwebtoken'

const secret = 'aaaabbbb'
export const createToken = (userInfo) => {
    const token = jwt.sign(userInfo, secret, {expiresIn: '24'})
    return token;
}
