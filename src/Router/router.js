const express = require('express');
const urlController = require('../Controllers/urlController');

const router = express.Router();

router.post('/getHospitals',urlController.showResult);

module.exports =router;