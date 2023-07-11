// Initialization for ES Users
import {
    Carousel,
    initTE
} from "tw-elements";
import { useEffect, useContext, useState } from "react";
import Canvas from "./canvas";
import { __state, get_data } from '@/app/dataHub';
import { DataContext } from "@/app/dataContext";
import Precipitation from "./graphics/precipitation";
import WeatherMap from "./graphics/weatherMap";

const Slides = () => {
    const { state, setState, data, setData, busy } = useContext(DataContext);

    useEffect(() => {
        setState(0);
        initTE({ Carousel });
        get_data().then(data => {
            console.log(data.length, state);
            setData(data);
        }).catch(err => {
            console.log("error:", err.message);
            setState(-2);
        })
            .finally(() => {
                // console.log("end");
                setState(3);
            });

    }, []);

    const draw = (weatherMap: WeatherMap, frameCount: number, ratio: number) => {
        // console.log(ratio,weatherMap.ctx.canvas.height);
        weatherMap.ctx.clearRect(0, 0, weatherMap.ctx.canvas.width, weatherMap.ctx.canvas.height)
        weatherMap.ctx.fillStyle = '#9ecaee'
        weatherMap.ctx.beginPath()
        weatherMap.ctx.arc(92.93 * ratio, 146.1 * ratio, ratio * 30 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        weatherMap.ctx.fill()
        weatherMap.ctx.closePath();

        weatherMap.ctx.textAlign = 'center';
        weatherMap.ctx.textBaseline = 'middle';
        weatherMap.ctx.fillStyle = '#404040';
        weatherMap.ctx.font = `${ratio * 16}px Lucida Console`;
        let message = "Welcome..";
        if (state === 0)
            message = "Connecting..";
        else if (state === 1)
            message = "Fetching..";
        else if (state > 1 && busy > 0)
            message = "Processing.."

        if (busy > 0)
            message += "busy";
        message += state;

        weatherMap.ctx.fillText(message, 420 * ratio, 560 * ratio);
    }

    const handleContextMenu = (event: any) => {
        event.preventDefault();
        event.stopPropagation(); // not necessary in my case, could leave in case stopImmediateProp isn't available? 
        event.nativeEvent?.stopImmediatePropagation();
        return false;
    }

    return (
        <>
            <div
                id="carouselMaps"
                className="relative"
                data-te-interval="0"
                data-te-carousel-init
                data-te-carousel-slide>

                {/* <!--Carousel indicators--> */}
                {state > 1 ?
                    <div
                        className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                        data-te-carousel-indicators>
                        <button
                            type="button"
                            data-te-target="#carouselMaps"
                            data-te-slide-to="0"
                            data-te-carousel-active
                            className="mx-[3px] box-content h-[4px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                            aria-current="true"
                            aria-label="Slide 1"></button>
                        <button
                            type="button"
                            data-te-target="#carouselMaps"
                            data-te-slide-to="1"
                            className="mx-[3px] box-content h-[4px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                            aria-label="Slide 2"></button>
                        <button
                            type="button"
                            data-te-target="#carouselMaps"
                            data-te-slide-to="2"
                            className="mx-[3px] box-content h-[4px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                            aria-label="Slide 3"></button>
                    </div>
                    : <div
                        className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                        data-te-carousel-indicators>
                        <button
                            type="button"
                            data-te-target="#carouselMaps"
                            data-te-slide-to="0"
                            data-te-carousel-active
                            className="mx-[3px] box-content h-[4px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                            aria-current="true"
                            aria-label="Slide 1"></button>
                    </div>}


                {/* <!--Carousel items--> */}
                <div
                    className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                    {state > 1 ?
                        <>
                            {/* <!--First item--> */}
                            <div
                                className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none backface-hidden"
                                data-te-carousel-active
                                data-te-carousel-item >
                                <Precipitation name="precipitation" width="512" height="723" className="absolute top-0 left-0 -z-10" />
                                {/* <img
                             src="azure.png"
                             className="block w-full -z-30 absolute top-0 left-0 opacity-40"
                             alt="..." onContextMenu={handleContextMenu} /> */}
                                <img src="map_nz.png" className="block w-full z-0" onContextMenu={handleContextMenu} />
                                <div
                                    className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                    <h5 className="text-xl">First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            {/* <!--Second item--> */}
                            <div
                                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none backface-hidden"
                                data-te-carousel-item >
                                <img
                                    src="azure.png"
                                    className="block w-full -z-10"
                                    alt="..." />
                                <div
                                    className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                    <h5 className="text-xl">Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            {/* <!--Third item--> */}
                            <div
                                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none backface-hidden"
                                data-te-carousel-item >
                                <img
                                    src="azure.png"
                                    className="block w-full"
                                    alt="..." />
                                <div
                                    className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                    <h5 className="text-xl">Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </>
                        :
                        <div
                            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none backface-hidden"
                            data-te-carousel-active
                            data-te-carousel-item >
                            <Canvas draw={draw} name="splash" width="512" height="723" className="absolute top-0 left-0 -z-10" />
                            {/* <img
                                src="azure.png"
                                className="block w-full -z-30 absolute top-0 left-0 opacity-40"
                                alt="..." onContextMenu={handleContextMenu} /> */}
                            <img src="map_nz.png" className="block w-full z-0" onContextMenu={handleContextMenu} />
                            <div
                                className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                <h5 className="text-xl">First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>}
                </div>

                {state === 3 && busy === 0 ?
                    <>
                        {/* <!--Carousel controls - prev item--> */}
                        <button
                            className="absolute bottom-0 left-0 top-1/2 transform -translate-y-1/2  z-[1] flex w-[15%] h-[20%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                            type="button"
                            data-te-target="#carouselMaps"
                            data-te-slide="prev">
                            <span className="inline-block h-8 w-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    className="h-6 w-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </span>
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Previous</span>
                        </button>
                        {/* <!--Carousel controls - next item--> */}
                        <button
                            className="absolute bottom-0 right-0 top-1/2 transform -translate-y-1/2 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                            type="button"
                            data-te-target="#carouselMaps"
                            data-te-slide="next">
                            <span className="inline-block h-8 w-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    className="h-6 w-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Next</span>
                        </button>
                    </>

                    : <></>}

            </div>

        </>
    )
}

export default Slides;