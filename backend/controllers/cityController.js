"use strict";

const HTMLParser = require('node-html-parser');
const axios = require('axios');
let Models = require("../models");

const buildCountry = async (req, res) => {
    if (req.params.code.toUpperCase() === "NZ") {
        try {
            const response = await axios.get('https://service.unece.org/trade/locode/nz.htm')
            //console.log(response.status)
            //console.log(response.data)
            const root = HTMLParser.parse(response.data)
            //console.log(root.querySelectorAll('table').length);

            const rows = root.querySelectorAll('tr')
            //console.log(rows.length)
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                //console.log(cells.length)
                console.log(cells[2].text.trim(), cells[4].text.trim(), cells[9].text.trim())
                const city = await Models.City.findOne({ "name": cells[2].text.trim() })
                if (city) {
                }
                else if (cells.length >= 8) {
                    await new Models.City({ "name": cells[2].text.trim(), "area": cells[4].text.toUpperCase().trim(), "coordinates": cells[9].text.trim() }).save()
                }

                // for(let j=0;j<cells.length;j++)
                // {
                //     //console.log(cells[j].text)
                // }
            }
            res.status(200)
            res.send({ result: 200, data: "NZ cities has been built." })
        } catch (error) {
            //console.error(error);
            //throw error
            res.send({ result: 500, error: error.message })
        }
    }

}

const getAreas = async (req, res) => {

    const areas = await Models.City.distinct('area');
    //console.log(JSON.stringify(areas));
    if (areas) {
        res.status(200)
        res.send({ result: 200, data: areas.filter(area => area.length > 0) })
    }
    else {
        res.send({ result: 500, error: "No area data found." })

    }

}

const getCities = async (req, res) => {

    const cities = await Models.City.find({ "area": req.params.area })
    //console.log(JSON.stringify(areas));
    if (cities) {
        res.status(200)
        res.send({ result: 200, data: cities })
    }
    else {
        res.send({ result: 500, error: "No area data found." })

    }

}

const updateCity = async (req, res) => {
    const city = await Models.City.findOne({ "name": req.body.name.trim() })
    if (city) {
        city.coordinates = req.body.coordinates
        if (req.body.area)
            city.area = req.body.area.trim()
        await city.save()
        res.status(200)
        res.send({ result: 200, data: city })
    }
    else {
        res.send({ result: 500, error: `City ${req.body.name.trim()} not found.` })

    }
}

const createCity = async (req, res) => {
    console.log(req.body)
    await new Models.City({ "name": req.body.name.trim(), "area": req.body.area.toUpperCase().trim(), "coordinates": req.body.coordinates.trim() }).save()
        .then(data => res.send({ result: 200, data: req.body }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const deleteCity = (req, res) => {
    //deletes the post matching the ID from the param
    Models.City.findByIdAndRemove(req.body.id, req.body, {
        useFindAndModify: false
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

module.exports = {
    buildCountry, getAreas, updateCity, createCity, deleteCity, getCities
}