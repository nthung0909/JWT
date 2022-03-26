const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const privateKey = 'hung';

function validateJWT(req, res, next) {
    const token = req.query.token;
    const decode = jwt.verify(token, privateKey);
    console.log(decode);
    next();
}

app.get('/login', function (req, res) {
    const token = jwt.sign({ username: 'admin', password: 123 }, privateKey, { expiresIn: '1h' });
    return res.json({
        token,
    })
})

app.get('/', validateJWT, (req, res) => {
    return res.json({status: 200, message: "Auth success"});
})

app.listen(3000, () => {
    console.log(`app is running at port 3000`);
})