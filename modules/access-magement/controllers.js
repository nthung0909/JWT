const Auth = require('../../middleware/auth');
const redisClient = require('../../config/redis.config');
const randomToken = require("rand-token");

module.exports = {
    login, refreshToken, logout
}

async function login(req, res) {
    try {
        const dataLogin = {username: 'hungnt', password: '123456'};
        const accessToken = await Auth.generateToken(dataLogin);
        const refreshToken = randomToken.suid(256);
        if(accessToken) {
            const refreshTokenRedis = await redisClient.get(refreshToken);
            if(!refreshTokenRedis) {
                await redisClient.set(refreshToken, 1);
            }
            return res.status(200).json({
                message: 'login successfully!',
                accessToken,
                refreshToken
            })
        }
        return res.status(401).json({
            message: 'login failed!!!'
        })
    } catch (e) {
        res.status(401).json({message: e.message});
    }
}

async function refreshToken(req, res) {
    const refreshToken = req.headers['refresh-token'];
    if(!refreshToken) {
        return res.status(401).json({message: 'refresh token not found'});
    }

    const redisRefreshToken = await redisClient.get(refreshToken);
    if(!redisRefreshToken) {
        return res.status(401).json({
            message: 'refresh token expired!!!'
        })
    }

    const dataLogin = {username: 'hungnt', password: '123456'};
    const accessToken = await Auth.generateToken(dataLogin);
    if(accessToken) {
        return res.status(200).json({
            message: 'get new token successfully!',
            tokens: {
                accessToken,
                refreshToken
            }
        })
    } else {
        return res.status(401).json({
            message: 'get new token failed!!!'
        })
    }
}

async function logout(req, res) {
    try {
        const token = req.headers['x-access-token'] || req.headers['access-token'];
        const refreshToken =  req.headers['refresh-token'];
        await Promise.all([redisClient.del(token),redisClient.del(refreshToken)]);
        return res.status(200).json({message: 'logout successfully'});
    } catch (e) {
        throw e;
    }
}
