const JWT = require('jsonwebtoken');
const redisClient = require('../config/redis.config');

module.exports = {
    generateToken, verifyToken
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
    const checkRedis = await redisClient.get(token);
    if(!checkRedis) {
        return res.status(401).json({message: 'token expired'});
    }

    next();
}
async function generateToken(data) {
    try {
        const payload = {
            username: data.username,
            password: data.password
        }
        const accessToken = await JWT.sign({
            ...payload,
            tokenType: 'accessToken'
        }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE})
        /*** save access token & refresh token to redis ***/
        await redisClient.set(accessToken, 1);

        return accessToken;
    } catch (e) {
        console.log(e);
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