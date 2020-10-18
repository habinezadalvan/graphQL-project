const express = require('express');
const router = express.Router();

const postBack = require('../controllers/index');


router.post('/postbacks', postBack.postback);


module.exports = router;