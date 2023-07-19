"use strict";

const axios = require('axios');
let Models = require("../models");
const haversine = require('haversine-distance');
const { Model } = require('mongoose');


const getCity = async (req, res, city) => {
    const weather = await Models.Weather.findOne({ "city": city ? city.toLowerCase() : req.params.city.toLowerCase() })
    // console.log(parseInt(req.query.now) > 0, parseInt(process.env.API_STALE_MINUTES))
    const regex = new RegExp(["^", city ? city.toLowerCase().trim() : req.params.city.toLowerCase().trim(), "$"].join(""), "i");
    const a_city = await Models.City.findOne({ "name": regex })
    if (!a_city) {
        res.send({ result: 500, error: `City ${city ? city : req.params.city} not found in NZ` })
        return
    }


    if (weather) {
        //console.log((Date.now() - weather.date) / (1000 * 60))
        if (parseInt(req.query.now) > 0 || (Date.now() - weather.date) / (1000 * 60) > (parseInt(process.env.API_STALE_MINUTES) || 60)) {
            await _city_weather(a_city).then(async data => {
                weather.content = data
                weather.date = Date.now()
                await weather.save()
                res.status(200)
                res.send({ result: 200, data/*: { "city": city ? city.toLowerCase() : req.params.city.toLowerCase(), "content": data }*/ })
            }).catch(err => {
                //console.error(err);
                res.send({ result: 500, error: err.message })
            })

        }
        else
            res.send({ result: 200, data: weather.content })
    }
    else {
        await _city_weather(a_city).then(async data => {
            await new Models.Weather({ "city": city ? city.toLowerCase() : req.params.city.toLowerCase(), "content": data }).save()
            res.status(200)
            res.send({ result: 200, data/*: { "city": city ? city.toLowerCase() : req.params.city.toLowerCase(), "content": data }*/ });

        }).catch(err => {
            console.error(err);
            res.send({ result: 500, error: err.message })
        })
    }

}

async function _city_weather(city) {

    try {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json' }
        };
        const lat = _unpack_dm_latitude(city.coordinates.split(' ')[0])
        const lon = _unpack_dm_longitude(city.coordinates.split(' ')[1])

        if (isFinite(lat) && isFinite(lon)) {
            //const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=Pacific%2FAuckland`
            //const response = await axios.get(`https://goweather.herokuapp.com/weather/${city.name.toLowerCase()}`, options)
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max,showers_sum,snowfall_sum,windspeed_10m_max&timezone=Pacific%2FAuckland`, options)
            //console.log(url)
            console.log(response.data)
            return { "city": city.name, "coordinates": city.coordinates, ...response.data }

        }
        else {
            return { "city": city.name, "coordinates": city.coordinates }
        }


    } catch (error) {
        //console.error(error);
        throw error
    }
}

// const getCitys = async (req, res) => {
//     const cities = ["beijing", "new york", "christchurch"]
//     let city_funcs = []
//     //let content = ""
//     cities.forEach(city => city_funcs.push(_city_weather(city)))

//     Promise.all(city_funcs)
//         .then((results) => {
//             console.log(results);
//             res.send({ result: 200, data: { "city": cities, "content": results } })
//         })
//         .catch((error) => {
//             console.error(error);
//             res.send({ result: 500, error: error.message })
//         });

//     // city_funcs.reduce((prev, cur) => prev.then(cur), _city_weather("test"))
//     //     .then(() => {
//     //         res.send({ result: 200, data: { "city": cities, "content": content } })

//     //     }).catch(err => {
//     //         //console.error(err);
//     //         res.send({ result: 500, error: err.message })
//     //     })
// }

const _getCity = async (city, now) => {
    const weather = await Models.Weather.findOne({ "city": city.name.toLowerCase().trim() })
    //const regex = new RegExp(["^", city.toLowerCase().trim(), "$"].join(""), "i");
    //const a_city = await Models.City.findOne({ "name": regex })
    //console.log(weather)
    let result

    if (weather) {
        //console.log((Date.now() - weather.date) / (1000 * 60))
        if (now || ((Date.now() - weather.date) / (1000 * 60) > (parseInt(process.env.API_STALE_MINUTES) || 60))) {
            await _city_weather(city).then(async data => {
                result = data
                weather.content = data
                weather.date = Date.now()
                await weather.save()
            }).catch(err => {
                //console.error(err);
                return { "error": `${city.name} has no data.` }
            })
        }
        else
            return weather.content
    }
    else {
        await _city_weather(city).then(async data => {
            result = data
            await new Models.Weather({ "city": city.name.toLowerCase().trim(), "content": data }).save()
        }).catch(err => {
            //console.error(err);
            return { "error": `${city.name} has no data.` }
        })
    }
    return result

}

// function delay(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Successfully delayed for ${ms} milliseconds`);
//         }, ms);
//     });
// }

function _unpack_dm_latitude(value) {
    //console.log(value)
    if (value === undefined || value === null)
        return NaN
    if (value.length != 5)
        return NaN
    let result = parseInt(value.slice(0, 2))
    //console.log(value.slice(2,4),value.slice(-1))
    result += parseInt(value.slice(2, 4)) / 60
    if (value.slice(-1).toUpperCase() === 'S')
        result *= -1
    // console.log(result)
    return result
}

function _unpack_dm_longitude(value) {
    //console.log(value)
    if (value === undefined || value === null)
        return 0
    if (value.length != 6)
        return 0
    let result = parseInt(value.slice(0, 3))
    //console.log(value.slice(2,4),value.slice(-1))
    result += parseInt(value.slice(3, 5)) / 60
    if (value.slice(-1).toUpperCase() === 'W')
        result *= -1
    // console.log(result)
    return result
}


const getCityAbout = async (req, res, distance) => {
    // console.log(process.env.API_CITY_ABOUT_KM)
    if ((parseInt(process.env.API_CITY_ABOUT_KM) > 0) && distance > parseInt(process.env.API_CITY_ABOUT_KM))
        distance = parseInt(process.env.API_CITY_ABOUT_KM)
    // console.log(distance)
    const cities = await Models.City.find({})
    const city = cities.find(city => city.name.toLowerCase() === req.params.city.toLowerCase())
    if (!city) {
        res.send({ result: 500, error: `City ${req.params.city} not found in NZ` })
        return
    }
    const lat = _unpack_dm_latitude(city.coordinates.split(' ')[0])
    const lon = _unpack_dm_longitude(city.coordinates.split(' ')[1])
    //console.log(lat,lon)
    if (isNaN(lat) || isNaN(lon))
        return getCity(req, res)
    let matched = cities.filter(city => {
        let result = 0
        if (city.coordinates.split(' ').length == 2 &&
            isFinite(_unpack_dm_latitude(city.coordinates.split(' ')[0])) && isFinite(_unpack_dm_longitude(city.coordinates.split(' ')[1]))) {
            result = haversine([lat, lon], [_unpack_dm_latitude(city.coordinates.split(' ')[0]), _unpack_dm_longitude(city.coordinates.split(' ')[1])]) / 1000
        }
        // console.log(result)
        if (result > 0 && result < distance)
            return true
        else
            return false
    })
    // console.log(matched)
    matched.unshift(city)
    let city_funcs = []
    matched.forEach(city => city_funcs.push(_getCity(city, parseInt(req.query.now) > 0 ? true : false)))

    Promise.all(city_funcs)
        .then((results) => {
            // console.log(results);
            res.send({ result: 200, data: results })
        })
        .catch((error) => {
            console.error(error);
            res.send({ result: 500, error: error.message })
        });

}

const getArea = async (req, res) => {
    const cities = await Models.City.find({ "area": req.params.area.toUpperCase().trim() })
    //console.log(cities)
    let city_funcs = []
    cities.forEach(city => city_funcs.push(_getCity(city, parseInt(req.query.now) > 0 ? true : false)))
    // city_funcs.push(delay(2000))

    // city_funcs.reduce((prev, cur) => prev.then(cur), delay(1000))
    //     .then((data) => {
    //         res.send({ result: 200, data })

    //     }).catch(err => {
    //         //console.error(err);
    //         res.send({ result: 500, error: err.message })
    //     })

    Promise.all(city_funcs)
        .then((results) => {
            // console.log(results);
            res.send({ result: 200, data: results })
        })
        .catch((error) => {
            console.error(error);
            res.send({ result: 500, error: error.message })
        });

}

module.exports = {
    getCity, getArea, getCityAbout
}