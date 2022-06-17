const Auth = require('../../middleware/auth');

module.exports = {
    login
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
    } catch (e) {
        res.status(401).json({message: e.message});
    }
}


