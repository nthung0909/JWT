const JWT = require('jsonwebtoken');

module.exports = {
    generateToken
}

async function verifyToken (req, res, next) {

    next();
}
async function generateToken(data) {
    const payload = {
        username: data.username,
        password: data.password
    }
    return {
        accessToken: await JWT.sign({
            ...payload,
            tokenType: 'accessToken'
        }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE}),

        refreshToken: await JWT.sign({
            ...payload,
            tokenType: 'refreshToken'
        }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE}),
    }
}