const JWT = require('jsonwebtoken');
const redis = require('redis');
const client = redis.createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

module.exports = {
    generateToken, verifyToken, parseToken
}

async function verifyToken (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['access-token'];
    if (!token) {
        return res.status(401).json({message: 'token not found'});
    }
    const tokenParse = parseToken(token);
    if(!tokenParse) {
        return res.status(401).json({message: 'token expired'});
    }

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

function parseToken(token) {
    return JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        let currentTimeStamp = Math.round(new Date().getTime() / 1000);
        if (err || currentTimeStamp > decoded.exp) {
            return false;
        }
        return decoded;
    });
}