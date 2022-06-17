const express = require('express');
// const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const routes = require('./modules/index');
// const privateKey = 'hung';
//
// function validateJWT(req, res, next) {
//     const token = req.query.token;
//     const decode = jwt.verify(token, privateKey);
//     console.log(decode);
//     next();
// }

require('./modules')(app);


app.listen(3000, () => {
    console.log(`app is running at port 3000`);
})
