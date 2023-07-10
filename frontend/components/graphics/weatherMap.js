'use strict';

const WeatherMap = function (ctx) {

    this.ctx = ctx;
    this.points = [];
    this.polygon = [];
    this.limits = {
        xMin: 0,
        xMax: 0,
        yMin: 0,
        yMax: 0
    };
    this.size = { height: ctx.canvas.height, width: ctx.canvas.width }
};

WeatherMap.crossProduct = function (o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
};

WeatherMap.pointInPolygon = function (point, vs) {

    var x = point.x,
        y = point.y,
        inside = false,
        i = 0,
        j = 0,
        xi = 0,
        xj = 0,
        yi = 0,
        yj = 0,
        intersect = false;

    j = vs.length - 1;
    for (i = 0; i < vs.length; i = i + 1) {
        xi = vs[i].x;
        yi = vs[i].y;
        xj = vs[j].x;
        yj = vs[j].y;

        intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) { inside = !inside; }
        j = i;
    }

    return inside;
};

WeatherMap.squareDistance = function (p0, p1) {

    var x = p0.x - p1.x,
        y = p0.y - p1.y;

    return x * x + y * y;
};

WeatherMap.hslToRgb = function (h, s, l) {

    var r, g, b, hue2rgb, q, p;

    if (s === 0) {
        r = g = b = l;
    } else {
        hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) {
                t += 1;
            } else if (t > 1) {
                t -= 1;
            }

            if (t >= 0.66) {
                return p;
            } else if (t >= 0.5) {
                return p + (q - p) * (0.66 - t) * 6;
            } else if (t >= 0.33) {
                return q;
            } else {
                return p + (q - p) * 6 * t;
            }
        };

        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;
        r = hue2rgb(p, q, h + 0.33);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 0.33);
    }

    return [(r * 255) | 0, (g * 255) | 0, (b * 255) | 0]; // (x << 0) = Math.floor(x)
};

// let _max_temp = NaN, _min_temp = NaN;
// let _max_wind = NaN, _min_wind = NaN;
WeatherMap.prototype.getTemp = function (levels, value) {
    var val = value,
        tmp = 0,
        lim = 0.85,
        min = -20, //_min_temp, //-30,
        max = 30, //_max_temp, //25,
        dif = max - min,
        lvs = 15;

    if (val < min) {
        val = min;
    }
    if (val > max) {
        val = max;
    }

    tmp = 1 - (1 - lim) - (((val - min) * lim) / dif);

    if (levels) {
        tmp = Math.round(tmp * lvs) / lvs;
    }

    return WeatherMap.hslToRgb(tmp, 1, 0.5);
};

WeatherMap.prototype.getWind = function (levels, value) {

    var val = value,
        tmp = 0,
        lim = 1.0, //0.55,
        min = 0, //_min_wind, // 0,
        max = 50, //_max_wind, //60,
        dif = max - min,
        lvs = 20;

    if (val < min) {
        val = min;
    }
    if (val > max) {
        val = max;
    }

    tmp = 1 - (1 - lim) - (((val - min) * lim) / dif);

    if (levels) {
        tmp = Math.round(tmp * lvs) / lvs;
    }

    //console.log(value,tmp)
    return (1.0 - tmp) * (1.0 - tmp) * (1.0 - tmp); //WeatherMap.hslToRgb(tmp, 1, 0.5);
};

WeatherMap.prototype.getShower = function (levels, value) {

    var val = value,
        tmp = 0,
        lim = 0.55,
        min = 0, //_min_wind, // 0,
        max = 20, //_max_wind, //60,
        dif = max - min,
        lvs = 5;

    if (val < min) {
        val = min;
    }
    if (val > max) {
        val = max;
    }

    tmp = 1 - (1 - lim) - (((val - min) * lim) / dif);

    if (levels) {
        tmp = Math.round(tmp * lvs) / lvs;
    }

    //console.log(value,tmp)
    return (1.0 - tmp) * (1.0 - tmp) * (1.0 - tmp); //WeatherMap.hslToRgb(tmp, 1, 0.5);
};


WeatherMap.prototype.getPointValue = function (limit, point, item = 'temp', index = 0) {

    var counter = 0,
        arr = [],
        tmp = 0.0,
        dis = 0.0,
        inv = 0.0,
        t = 0.0,
        b = 0.0,
        pwr = 2,
        ptr;

    // From : https://en.wikipedia.org/wiki/Inverse_distance_weighting

    if (WeatherMap.pointInPolygon(point, this.polygon)) {

        for (counter = 0; counter < this.points.length; counter = counter + 1) {
            dis = WeatherMap.squareDistance(point, this.points[counter]);
            if (dis === 0) {
                return this.points[counter][item][index]; //wind ? this.points[counter].wind[index] : this.points[counter].value[index];
            }
            arr[counter] = [dis, counter];
        }

        arr.sort(function (a, b) { return a[0] - b[0]; });

        for (counter = 0; counter < limit; counter = counter + 1) {
            ptr = arr[counter];
            if (!ptr || ptr.length < 2)
                return -255
            inv = 1 / Math.pow(ptr[0], pwr);
            t = t + inv * this.points[ptr[1]][item][index]; //(wind ? this.points[ptr[1]].wind[index] : this.points[ptr[1]].value[index]);
            b = b + inv;
        }

        return t / b;

    } else {
        return -255;
    }
};

WeatherMap.prototype.setConvexhullPolygon = function (points) {
    if (points.length == 0)
        return;

    var lower = [],
        upper = [],
        i = 0;

    // Sort by 'y' to get yMin/yMax
    points.sort(function (a, b) {
        return a.y === b.y ? a.x - b.x : a.y - b.y;
    });

    this.limits.yMin = points[0].y;
    this.limits.yMax = points[points.length - 1].y;

    // Sort by 'x' to get convex hull polygon and xMin/xMax
    points.sort(function (a, b) {
        return a.x === b.x ? a.y - b.y : a.x - b.x;
    });

    this.limits.xMin = points[0].x;
    this.limits.xMax = points[points.length - 1].x;

    // Get convex hull polygon from points sorted by 'x'
    for (i = 0; i < points.length; i = i + 1) {
        while (lower.length >= 2 && WeatherMap.crossProduct(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
            lower.pop();
        }
        lower.push(points[i]);
    }

    for (i = points.length - 1; i >= 0; i = i - 1) {
        while (upper.length >= 2 && WeatherMap.crossProduct(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
            upper.pop();
        }
        upper.push(points[i]);
    }

    upper.pop();
    lower.pop();
    this.polygon = lower.concat(upper);
};

// let __points, __width, __height, __context;
let __context, __rst = [], __done = false;
let __date = ["", "", "", "", "", "", ""];
const __dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const __scale = 0.584475;
// let __day = ["", "", "", "", "", "", ""];
WeatherMap.prototype.setPoints = function (arr, width, height) {
    __context = this;
    // __points = arr;
    // __width = width;
    // __height = height;
    this.points = arr;
    this.width = width;
    this.height = height;
    this.setConvexhullPolygon(this.points);
};

import { __day } from "@/app/dataHub";
let _temp_img = [];
WeatherMap.prototype.drawLow = async function (frame, ratio) {//(limit, res, clean, callback, frame = 0) {
    return new Promise((resolve, reject) => {
        const limit = 5, res = 3, clean = false, callback = null;
        //console.log(_max_temp, _min_temp, _max_wind, _min_wind)
        //return new Promise((resolve, reject) => {
        let self = this;
        if (!(self instanceof WeatherMap))
            self = __context;
        //console.log(self);
        // console.log(_temp_img.length, frame);

        const index = _temp_img.findIndex(data => data.ratio !== ratio);
        if (index >= 0) {
            while (_temp_img.length > 0) {
                _temp_img.pop();
            }
        }

        const data = _temp_img.find(a => a.frame === frame);
        if (data) {
            self.ctx.clearRect(0, 0, self.size.width, self.size.height);
            // self.ctx.scale(ratio, ratio);
            try {
                self.ctx.putImageData(data.data, 0, 0);
            } catch (err) {
                console.log("error:", err.message);
            }
        }
        else if (_temp_img.length < 7) {
            let ctx = self.ctx,
                dbl = 2 * res,
                col = [],
                cnt = 0,
                x = 0,
                y = 0,
                val = 0.0,
                str = '',
                xBeg = self.limits.xMin,
                yBeg = self.limits.yMin,
                xEnd = self.limits.xMax,
                yEnd = self.limits.yMax,
                lim = limit > self.points.length ? self.points.length : limit + 1,
                gradient;

            ctx.clearRect(0, 0, self.size.width, self.size.height);
            // console.log(self.size.width, self.size.height)
            //ctx.width += 0;   //<=== Resizing the canvas will cause the canvas to get cleared.

            // Draw aproximation
            for (x = xBeg; x < xEnd; x = x + res) {
                for (y = yBeg; y < yEnd; y = y + res) {
                    // val = self.getPointValue(lim, { x: x, y: y }, 'temp', frame);
                    // //console.log(val)
                    // if (val && val !== -255) {
                    //     ctx.beginPath();  //<== beginpath

                    //     col = self.getTemp(true, val);
                    //     str = 'rgba(' + col[0] + ', ' + col[1] + ', ' + col[2] + ', ';
                    //     //console.log(col);
                    //     //str = 'rgba(' + 225 + ', ' + 225 + ', ' + 225 + ', ';
                    //     gradient = ctx.createRadialGradient(x, y, 1, x, y, res);
                    //     gradient.addColorStop(0, str + `0.5)`);
                    //     gradient.addColorStop(1, str + '0)');
                    //     //ctx.fillStyle = "#191919"; //<=== must be filled white for properly render
                    //     ctx.fillStyle = gradient;
                    //     ctx.fillRect(x - res, y - res, dbl, dbl);
                    //     ctx.fill();
                    //     ctx.closePath(); //<== must be closed

                    // }

                    /*val = self.getPointValue(lim, { x: x, y: y }, 'wind', frame);
                    if (val && val != -255) {
                        ctx.beginPath();  //<== beginpath
        
                        col = self.getWind(true, val);
                        if (col < 0.1)
                            col = 0;
                        //str = 'rgba(' + col[0] + ', ' + col[1] + ', ' + col[2] + ', ';
                        //console.log(col);
                        str = 'rgba(' + 0 + ', ' + 0 + ', ' + 255 + ', ';
                        gradient = ctx.createRadialGradient(x, y, 1, x, y, res);
                        gradient.addColorStop(0, str + `${col})`);
                        gradient.addColorStop(1, str + '0)');
                        //ctx.fillStyle = "#191919"; //<=== must be filled white for properly render
                        ctx.fillStyle = gradient;
                        ctx.fillRect(x - res, y - res, dbl, dbl);
                        ctx.fill();
                        ctx.closePath(); //<== must be closed
                    }*/

                    val = self.getPointValue(lim, { x: x, y: y }, 'rain', frame);
                    if (val && val != -255) {
                        ctx.beginPath();  //<== beginpath

                        col = self.getShower(true, val);
                        if (col < 0.08)
                            col = 0;
                        //str = 'rgba(' + col[0] + ', ' + col[1] + ', ' + col[2] + ', ';
                        //console.log(col);
                        str = 'rgba(' + 64 + ', ' + 64 + ', ' + 64 + ', ';
                        gradient = ctx.createRadialGradient(x, y, 1, x, y, res);
                        gradient.addColorStop(0, str + `${col})`);
                        gradient.addColorStop(1, str + '0)');
                        //ctx.fillStyle = "#191919"; //<=== must be filled white for properly render
                        ctx.fillStyle = gradient;
                        ctx.fillRect(x - res, y - res, dbl, dbl);
                        ctx.fill();
                        ctx.closePath(); //<== must be closed
                    }

                    val = self.getPointValue(lim, { x: x, y: y }, 'snow', frame);
                    if (val && val != -255) {
                        ctx.beginPath();  //<== beginpath

                        col = self.getShower(true, val);
                        if (col < 0.08)
                            col = 0;
                        //str = 'rgba(' + col[0] + ', ' + col[1] + ', ' + col[2] + ', ';
                        //console.log(col);
                        str = 'rgba(' + 0 + ', ' + 255 + ', ' + 255 + ', ';
                        gradient = ctx.createRadialGradient(x, y, 1, x, y, res);
                        gradient.addColorStop(0, str + `${col})`);
                        gradient.addColorStop(1, str + '0)');
                        //ctx.fillStyle = "#191919"; //<=== must be filled white for properly render
                        ctx.fillStyle = gradient;
                        ctx.fillRect(x - res, y - res, dbl, dbl);
                        ctx.fill();
                        ctx.closePath(); //<== must be closed
                    }



                    // val = self.getPointValue(lim, { x: x, y: y }, 'uv', frame);
                    // if (val && val != -255) {
                    //     ctx.beginPath();  //<== beginpath

                    //     col = self.getUV(true, val);
                    //     if (col < 0.1)
                    //         col = 0;
                    //     //str = 'rgba(' + col[0] + ', ' + col[1] + ', ' + col[2] + ', ';
                    //     //console.log(col);
                    //     //str = 'rgba(' + 141 + ', ' + 2 + ', ' + 241 + ', ';
                    //     str = 'rgba(' + 255 + ', ' + 0 + ', ' + 0 + ', ';
                    //     gradient = ctx.createRadialGradient(x, y, 1, x, y, res);
                    //     gradient.addColorStop(0, str + `${col})`);
                    //     gradient.addColorStop(1, str + '0)');
                    //     //ctx.fillStyle = "#191919"; //<=== must be filled white for properly render
                    //     ctx.fillStyle = gradient;
                    //     ctx.fillRect(x - res, y - res, dbl, dbl);
                    //     ctx.fill();
                    //     ctx.closePath(); //<== must be closed
                    // }


                }
            }

            const frame_x = 159 * __scale * ratio, frame_y = 250 * __scale * ratio;
            ctx.beginPath();
            ctx.fillStyle = '#9ecaee';
            ctx.beginPath();
            ctx.arc(frame_x, frame_y, 100 * __scale * ratio, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.arc(frame_x, frame_y, 100 * __scale * ratio, 0, 2 * Math.PI, false);
            ctx.stroke();

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';
            ctx.font = `${ratio * 30}px Arial`;
            ctx.fillText(frame, frame_x, frame_y - 20*ratio);
            ctx.fillText(__day[frame], frame_x, frame_y + 15*ratio);
            ctx.closePath();

            // Erase polygon outsides
            if (clean && self.polygon.length > 1) {
                ctx.globalCompositeOperation = 'destination-in';
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.beginPath();
                ctx.moveTo(self.polygon[0].x, self.polygon[0].y);
                for (cnt = 1; cnt < self.polygon.length; cnt = cnt + 1) {
                    ctx.lineTo(self.polygon[cnt].x, self.polygon[cnt].y);
                }
                ctx.lineTo(self.polygon[0].x, self.polygon[0].y);
                ctx.closePath();
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            }

            if (typeof callback === 'function') {
                callback();
            }
            //     resolve("done!");
            // });

            // if (__done) {
            //     ++_frame;
            //     //_frame[frame] = 
            //     _temp_img.push(self.ctx.getImageData(0, 0, self.width, self.height));
            // }

            _temp_img.push({ frame, ratio, data: self.ctx.getImageData(0, 0, self.width, self.height) });

        }
        else {
            //let frame = 0;
            // if (frame < 7) {
            //     //frame = _frame;
            //     self.ctx.clearRect(0, 0, self.size.width, self.size.height);
            //     // self.ctx.scale(ratio, ratio);
            //     try {
            //         self.ctx.putImageData(_temp_img[frame], 0, 0);
            //     } catch (err) {
            //         console.log("error:", err.message);
            //         while (_temp_img.length > 0) {
            //             _temp_img.pop();
            //         }
            //     }
            //     // console.log(_frame)

            // }

        }
        resolve([_temp_img.length === 7 ? 3 : 2, 0]);
        // setTimeout(this.drawLow, 1000);
    });

    // });
};


WeatherMap.prototype.drawPoints = function (callback) {

    var self = this,
        PI2 = 2 * Math.PI,
        ctx = this.ctx;
    window.requestAnimationFrame(function (timestamp) {
        var col = [],
            idx = 0,
            pnt;

        for (idx = 0; idx < self.points.length; idx = idx + 1) {
            pnt = self.points[idx];

            col = self.getColor(false, pnt.value);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(pnt.x, pnt.y, 8, 0, PI2, false);
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgb(' + col[0] + ', ' + col[1] + ', ' + col[2] + ')';
            ctx.beginPath();
            ctx.arc(pnt.x, pnt.y, 8, 0, PI2, false);
            //ctx.stroke();

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillText(Math.round(pnt.value), pnt.x, pnt.y);
        }

        if (typeof callback === 'function') {
            callback();
        }
    });
};


function _unpack_dm_latitude(value) {
    //console.log(value)
    if (value === undefined || value === null)
        return 0
    if (value.length != 5)
        return 0
    let result = parseInt(value.slice(0, 2))
    //console.log(value.slice(2,4),value.slice(-1))
    result += parseInt(value.slice(2, 4)) / 60
    // if (value.slice(-1).toUpperCase() === 'S')
    //     result *= -1
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
    // if (value.slice(-1).toUpperCase() === 'W')
    //     result *= -1
    // console.log(result)
    return result
}

export default WeatherMap;