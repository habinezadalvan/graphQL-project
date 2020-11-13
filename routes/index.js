const express = require('express');
const router = express.Router();
import routes from './api'
const postBack = require('../controllers/index');


router.post('/postbacks', postBack.postback);
router.use('/api/v1/', routes);


module.exports = router;