'use strict';
const jwt = require("jsonwebtoken");

const url = require('url');
let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");


router.get('/build/:code', (req, res) => {
    Controllers.cityController.buildCountry(req, res);
})

router.get('/areas', (req, res) => {
    Controllers.cityController.getAreas(req, res);
})

router.get('/cities/:area', (req, res) => {
    Controllers.cityController.getCities(req, res);
})

router.put('/build/city', (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token is valid
        const { user } = jwt.verify(token, process.env.JWT_SECRET);
        if (user)
            Controllers.cityController.updateCity(req, res);
    } catch (error) {
        return res.status(401).json({ error: "Not Authorized" });
    }
    // Controllers.cityController.updateCity(req, res);
})

router.post('/build/city', (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token is valid
        const { user } = jwt.verify(token, process.env.JWT_SECRET);
        if (user)
            Controllers.cityController.createCity(req, res);
    } catch (error) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    // Controllers.cityController.createCity(req, res);
})

router.delete('/build/city', (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token is valid
        const { user } = jwt.verify(token, process.env.JWT_SECRET);
        if (user)
            Controllers.cityController.deleteCity(req, res);
    } catch (error) {
        return res.status(401).json({ error: "Not Authorized" });
    }
})


module.exports = router;