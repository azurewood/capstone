import { useRef, useEffect, useContext } from 'react'
import WeatherMap from './graphics/weatherMap';
import { DataContext } from "@/app/dataContext";
import { setFips } from 'crypto';

let frameCount=-1;
let start: number, previousTimeStamp: number | undefined = undefined
const useCanvas = (draw: any, type: number = 1) => {
    // const { frame, setFrame } = useContext(DataContext);
    

    const canvasRef = useRef(null)

    function resizeCanvas(canvas: any) {
        if (canvas.parentNode === null || canvas.parentNode === undefined)
            return [-1, 0, 0];

        const { width, height } = canvas.parentNode.getBoundingClientRect()
        // console.log(width)

        // if (canvas.width !== width || canvas.height !== height) {
        if (512 !== width || 723 !== height) {
            //   const { devicePixelRatio:ratio=1 } = window
            const ratio = width / 512 //canvas.width
            // console.log(canvas.width,width,ratio)
            //   const context = canvas.getContext('2d')
            //   canvas.width = width*ratio
            //   canvas.height = height*ratio
            // context.scale(ratio, ratio)

            //   console.log(canvas.width,width,ratio)
            return [ratio, width, height]
        }

        return [1, width, height]
    }

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const context = (canvas as HTMLCanvasElement).getContext('2d', { willReadFrequently: true });
        const weatherMap = new WeatherMap(context);
        if (!context)
            return;
        // let frameCount = 0; //frame;
        let animationFrameId: number
        // let start: number, previousTimeStamp: number | undefined = undefined

        //Our draw came here

        const render = async (timeStamp: number) => {
            // frameCount++
            if (start === undefined) {
                start = timeStamp;
            }

            const [ratio, width, height] = resizeCanvas(canvas)
            if (ratio > 0) {
                // context.scale(ratio,ratio)
                if (type === 0) {
                    context.canvas.width = width;
                    weatherMap.size.width = width;
                    weatherMap.size.height = height;
                    ++frameCount;
                    await draw(weatherMap, frameCount, ratio);
                }
                else {
                    if (frameCount >= -1 && frameCount < 6) {
                        // timeStamp;
                        // console.log(timeStamp - previousTimeStamp, timeStamp);
                        if (previousTimeStamp === undefined || (timeStamp - previousTimeStamp) > (frameCount === -1 ? 4000 : 2000)) {
                            previousTimeStamp = timeStamp;
                            context.canvas.height = height;
                            context.canvas.width = width;
                            weatherMap.size.width = width;
                            weatherMap.size.height = height;
                            // console.log(frameCount);
                            ++frameCount;
                            await draw(weatherMap, frameCount, ratio);
                            
                        }

                    }
                    else if (frameCount > 5 || frameCount < -1) {
                        ++frameCount;
                        if (frameCount > 400)
                            frameCount = -100;

                    }

                }
            }
            // console.log(timeStamp, previousTimeStamp, start, timeStamp - start, timeStamp - previousTimeStamp, frameCount);

            // if (timeStamp-start<20000){
            animationFrameId = window.requestAnimationFrame(render)


            // }


        }
        window.requestAnimationFrame(render)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
}

export default useCanvas