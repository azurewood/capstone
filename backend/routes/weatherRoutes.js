'use strict';

const url = require('url');
let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");


router.get('/city/:city', (req, res) => {
    if (parseInt(req.query.about) > 0)
        Controllers.weatherController.getCityAbout(req, res, parseInt(req.query.about));
    else
        Controllers.weatherController.getCity(req, res);
})

router.get('/area/:area', (req, res) => {
    Controllers.weatherController.getArea(req, res);
})

// router.get('/', (req, res) => {
//     Controllers.weatherController.getCitys(req, res);
// })

module.exports = router;