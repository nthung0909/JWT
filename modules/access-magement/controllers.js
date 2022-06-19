const Auth = require('../../middleware/auth');

module.exports = {
    login, refreshToken
}


async function login(req, res) {
    try {
        const dataLogin = {username: 'hungnt', password: '123456'};
        const tokens = await Auth.generateToken(dataLogin);
        if(tokens) {
            return res.status(200).json({
                message: 'login successfully!',
                tokens
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

    const refreshTokenParse = Auth.parseToken(refreshToken);
    if(!refreshTokenParse) {
        res.status(401).json({
            message: 'request token expired!!!'
        })
    }

    const dataLogin = {username: 'hungnt', password: '123456'};
    const tokens = await Auth.generateToken(dataLogin);
    if(tokens) {
        return res.status(200).json({
            message: 'get new token successfully!',
            tokens
        })
    } else {
        return res.status(401).json({
            message: 'get new token failed!!!'
        })
    }
}


