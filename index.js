const express = require('express');
require('dotenv').config();
const app = express();
const CONFIG = require('./src/config');

const bodyParser = require('body-parser');
const router = require('./src/routes');

app.use('/api', router)
app.use(bodyParser.json());

app.listen(CONFIG.PORT, () => {
    console.log(`Server is running at http://localhost:${CONFIG.PORT}`)
})