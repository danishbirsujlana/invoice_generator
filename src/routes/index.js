const express = require('express');
const { testFunc, generateTypeA } = require('../controller');
const router = express.Router();

router.post("/post", testFunc);
router.post("/generate/typeA", generateTypeA);

module.exports = router;