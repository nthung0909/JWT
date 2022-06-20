const express = require('express');
const app = express();
require('dotenv').config();
const redis = require('./config/redis.config');

require('./modules')(app);

app.listen(3000, async () => {
    console.log(`app is running at port 3000`);
    await redis.connect();
    console.log('---- redis connected!!! -----');
})