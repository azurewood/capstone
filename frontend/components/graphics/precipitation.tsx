import React, { useEffect, useContext } from 'react';
import useCanvas from '../useCanvas';
import { DataContext } from "@/app/dataContext";
import WeatherMap from './weatherMap';

const Precipitation = (props: any) => {
    const { state, setState, data } = useContext(DataContext);

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    //const draw = (ctx: CanvasRenderingContext2D, frameCount: number, ratio: number) => {
    const draw = async (weatherMap: WeatherMap, frameCount: number, ratio: number) => {
        // const copy = data.map(a => ({...a}));
        // // console.log(ratio,weatherMap.ctx.canvas.height,723*ratio);
        // weatherMap.setPoints(copy.map((item) => {
        //     item.x *= ratio;
        //     item.y *= ratio;
        //     return item;
        // }), 512 * ratio, 723 * ratio);

        weatherMap.setPoints(data.map((a) => {
            const b = { ...a };
            b.x *= ratio;
            b.y *= ratio;
            return b;
        }), 512 * ratio, 723 * ratio);
        weatherMap.drawLow(frameCount, ratio);
        await delay(5000);
    }

    // const { draw, ...rest } = props
    const canvasRef = useCanvas(draw)

    return <canvas ref={canvasRef} {...props} />
}

export default Precipitation;