import React, { useEffect, useContext } from 'react';
import useCanvas from '../useCanvas';
import { DataContext } from "@/app/dataContext";
import type { DataType } from '@/app/dataContext';

import WeatherMap from './weatherMap';
import { __rst } from '@/app/dataHub';

const Precipitation = (props: any) => {
    const { state, setState, data, setBusy, frame, setFrame } = useContext(DataContext);

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
        setState(4);
        setBusy(1);
        // setFrame(frameCount);

        // setIndex(frameCount);
        // console.log(frameCount)

        weatherMap.setPoints(__rst.map((a: DataType) => {
            const b = { ...a };
            b.x *= ratio;
            b.y *= ratio;
            return b;
        }), 512 * ratio, 723 * ratio);
        // setFrame(frameCount);
        weatherMap.drawLow(frameCount, ratio).then(([state, busy, index]) => {
            setState(state);
            setBusy(busy);
            // setFrame(frame);
            // console.log(state, busy, index, frame);
            // setFrame(index);
            
        });
        // await delay(5000);
    }

    // const { draw, ...rest } = props
    const canvasRef = useCanvas(draw)

    return <canvas ref={canvasRef} {...props} />
}

export default Precipitation;