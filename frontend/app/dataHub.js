const __dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const __scale = 0.584475;
const __areas = [
    "AUK",
    "BOP",
    "CAN",
    "GIS",
    "HKB",
    "MBH",
    "MWT",
    "NSN",
    "NTL",
    "OTA",
    "STL",
    "TAS",
    "TKI",
    "WGN",
    "WKO",
    "WTC"
]

let __date = ["", "", "", "", "", "", ""];
let __day = ["", "", "", "", "", "", ""];
let _data;
let __rst = [];
let __done = false;
let __state = 0;

const fetch_data = function (area) {

    return new Promise((resolve, reject) => {
        const url = `https://nz-weather-api.onrender.com/api/weather/area/${area}?now=0`;
        //const url='https://goweather.herokuapp.com/weather/Sydney';
        // fetch(url,{
        //         //mode: 'no-cors',
        //         //credentials: 'include',
        //         method: 'GET',
        //         headers: {
        //            'Accept':  'application/json',
        //          }
        //     })
        // .then(res=>console.log(res.json()))
        // .then(data=>console.log(data))
        // .catch(error=>console.log(error))

        const xhr = new XMLHttpRequest();
        //const url='https://jsonplaceholder.typicode.com/posts';
        xhr.open("GET", url);
        xhr.send();

        xhr.onreadystatechange = (e) => {

            if (xhr.readyState === XMLHttpRequest.DONE) {
                const status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    // The request has been completed successfully
                    try {
                        _data = JSON.parse(xhr.response)?.data;
                        if (_data)
                            __state = 1;
                    } catch (err) {
                        __state = -1;
                        console.log(err);
                    }

                    if (_data) {
                        //console.log(Http.responseText);
                        _data = _data.map(item => {
                            if (item) {
                                item.y = Math.abs(item.latitude); //_unpack_dm_latitude(item.coordinates.split(' ')[0]);
                                item.x = Math.abs(item.longitude); //_unpack_dm_longitude(item.coordinates.split(' ')[1]);
                            }
                            return item;
                        });
                        // console.log(_data);

                        let //counter = 0,
                            x = 0,
                            y = 0,
                            // v = [], //0.0,
                            // w = [], //0.0,
                            tmp = 0.0;
                        //rst = [];


                        _data.forEach(element => {
                            if (element && isFinite(element.latitude) && isFinite(element.longitude)) {
                                let v = [], w = [], r = [], s = [], u = []; //0.0,
                                x = (element.x - 166.3) * 67.36 + 20;
                                y = (element.y - 33.9) * 88 + 10;

                                x *= __scale;
                                y *= __scale;

                                // tmp = element.temperature.length > 0 ? parseInt(element.temperature.split(' ')[0]) : NaN;
                                // v.push(tmp);
                                // if (isNaN(_max_temp) || tmp > _max_temp)
                                //     _max_temp = tmp;
                                // if (isNaN(_min_temp) || tmp < _min_temp)
                                //     _min_temp = tmp;

                                // tmp = element.wind.length > 0 ? parseInt(element.wind.split(' ')[0]) : NaN;
                                // w.push(tmp);
                                // if (isNaN(_max_wind) || tmp > _max_wind)
                                //     _max_wind = tmp;
                                // if (isNaN(_min_wind) || tmp < _min_wind)
                                //     _min_wind = tmp;

                                // element.forecast.forEach(ele => {
                                //     tmp = ele.temperature.length > 0 ? parseInt(ele.temperature.split(' ')[0]) : NaN;
                                //     v.push(tmp);
                                //     if (isNaN(_max_temp) || tmp > _max_temp)
                                //         _max_temp = tmp;
                                //     if (isNaN(_min_temp) || tmp < _min_temp)
                                //         _min_temp = tmp;
                                //     tmp = ele.wind.length > 0 ? parseInt(ele.wind.split(' ')[0]) : NaN;
                                //     w.push(tmp);
                                //     if (isNaN(_max_wind) || tmp > _max_wind)
                                //         _max_wind = tmp;
                                //     if (isNaN(_min_wind) || tmp < _min_wind)
                                //         _min_wind = tmp;
                                // });

                                [0, 1, 2, 3, 4, 5, 6].forEach(idx => {
                                    tmp = (parseFloat(element.daily.temperature_2m_max[idx]) + parseFloat(element.daily.temperature_2m_min[idx])) / 2;
                                    v.push(tmp);
                                    // if (isNaN(_max_temp) || tmp > _max_temp)
                                    //     _max_temp = tmp;
                                    // if (isNaN(_min_temp) || tmp < _min_temp)
                                    //     _min_temp = tmp;
                                    //tmp = parseFloat(element.daily.windspeed_10m_max[idx]);
                                    tmp = parseFloat(element.daily.windspeed_10m_max[idx]);
                                    w.push(tmp);
                                    tmp = parseFloat(element.daily.showers_sum[idx]);
                                    r.push(tmp);
                                    tmp = parseFloat(element.daily.snowfall_sum[idx]);
                                    s.push(tmp);
                                    tmp = parseFloat(element.daily.uv_index_max[idx]);
                                    u.push(tmp);
                                    // if (isNaN(_max_wind) || tmp > _max_wind)
                                    //     _max_wind = tmp;
                                    // if (isNaN(_min_wind) || tmp < _min_wind)
                                    //     _min_wind = tmp;
                                    __date[idx] = element.daily.time[idx];
                                    __day[idx] = __dayNames[new Date(element.daily.time[idx]).getDay()];
                                })

                                if (element.x > 0 && element.y > 0 && x > 0 && y > 0)
                                    __rst.push({ x: x, y: y, temp: v, wind: w, rain: r, snow: s, uv: u });
                                //console.log(x, y, v, w);
                            }
                        });
                        // for (counter = 0; counter < 25; counter = counter + 1) {

                        //     x = parseInt((Math.random() * 100000) % width, 10);
                        //     y = parseInt((Math.random() * 100000) % height, 10);
                        //     v = (Math.random() * 100) / 2;

                        //     if (Math.random() > 0.5) { v = -v; }
                        //     if (Math.random() > 0.5) { v = v + 30; }

                        //     rst.push({ x: x, y: y, value: v, wind: 0 });
                        // }

                        // console.log(__rst);
                        //this.setPoints(__rst, width, height);
                    }
                    resolve("data fetched!");
                    __state = 2;
                    //this.drawLow();
                }
                //console.log(xhr.responseText);
            } else {
                // Oh no! There has been an error with the request!
                //reject("something went wrong!");
            }
        }

    });
}

const get_data = async function () {
    let data_funcs = [];
    __areas.forEach(area => data_funcs.push(fetch_data(area)));
    await Promise.all(data_funcs).then((results) => {
        console.log(results);
        __done = true;
        __state = 3;
        // this.animate();
    });
    // .catch((error) => {
    //     __state = -2;
    //     // console.error(error);
    //     throw error;
    // });
    return __rst;

}

export { __dayNames, __scale, __areas, __state, get_data }