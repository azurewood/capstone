// Initialization for ES Users
import {
    Carousel,
    initTE
} from "tw-elements";
import { useEffect, useContext, useState, useRef } from "react";
import Canvas from "./canvas";
import { get_data } from '@/app/dataHub';
import { DataContext } from "@/app/dataContext";
import Precipitation from "./graphics/precipitation";
import WeatherMap from "./graphics/weatherMap";
import dynamic from 'next/dynamic'
import type { DataType } from "@/app/dataContext";
import WIcon from "./weather/icons";
import { get_wc_string } from "./weather/icons";
const MyCity = dynamic(() => import("./weather/myCity"), { ssr: false });
const MyCharts = dynamic(() => import("./weather/myCharts"), { ssr: false });

const Slides = () => {
    const { state, setState, data, setData, busy, setBusy, setFrame, homeCity, setHomeCity, cities, setCities } = useContext(DataContext);
    const [cityData, setCityData] = useState<DataType>();
    const ref = useRef<HTMLDivElement>(null)
    const [ratio, setRatio] = useState(1)

    useEffect(() => {
        initTE({ Carousel });
        let newObject = window.localStorage.getItem("homeCity");
        if (newObject) {
            setHomeCity(JSON.parse(newObject));
            // console.log(JSON.parse(newObject));
        }
        else
            setHomeCity("Wellington");

        newObject = window.localStorage.getItem("cities");
        let cityNames:string[]=[];
        if (newObject) {
            //setCities(JSON.parse(newObject));
            // console.log(JSON.parse(newObject));
            cityNames=JSON.parse(newObject).map((a:DataType)=>a.city);
        }
        // console.log(cityNames);

        const myCities: DataType[] = [];
        // setFrame(0);
        if (data.length === 0) {
            setState(0);
            get_data().then(data => {
                console.log(data.length, state);
                // setData(data);
                setData(data.map(a => {
                    const b = { ...a };
                    if(b.city in cityNames)
                        myCities.push({ area: b.area, city: b.city, wc: [...b.wc], x: b.x, y: b.y, temp: [...b.temp], wind: [...b.wind], rain: [...b.rain], snow: [...b.snow], uv: [...b.uv] })

                    if (b.city === homeCity)
                        setCityData({ area: b.area, city: b.city, wc: [...b.wc], x: b.x, y: b.y, temp: [...b.temp], wind: [...b.wind], rain: [...b.rain], snow: [...b.snow], uv: [...b.uv] });
                    // console.log(b.city);
                    return { area: b.area, city: b.city, wc: [...b.wc], x: b.x, y: b.y, temp: [...b.temp], wind: [...b.wind], rain: [...b.rain], snow: [...b.snow], uv: [...b.uv] }
                }));
                setCities(myCities);
            }).catch(err => {
                console.log("error:", err.message);
                setState(-2);
            }).finally(() => {
                // console.log("end");
                setState(2);
                setBusy(1);
            });
        }

        // console.log(data.length);
    }, []);

    useEffect(() => {
        // console.log(homeCity);
        setTimeout(() => {
            localStorage.setItem("homeCity", JSON.stringify(homeCity));
        }, 100);
    }, [homeCity]);

    useEffect(() => {
        // console.log(homeCity);
        localStorage.setItem("cities", JSON.stringify(cities));
    }, [cities]);

    useEffect(() => {
        // console.log(homeCity);
        data.forEach(a => {
            const b = { ...a };
            if (b.city === homeCity)
                setCityData({ area: b.area, city: b.city, wc: [...b.wc], x: b.x, y: b.y, temp: [...b.temp], wind: [...b.wind], rain: [...b.rain], snow: [...b.snow], uv: [...b.uv] });
        });
    }, [data]);

    useEffect(() => {
        if (ref.current)
            setRatio(ref.current?.clientWidth / 512);
        // console.log(ref.current?.clientWidth);
    });

    useEffect(() => {
        if (state !== 3) {
            const myCarouselEl = document.getElementById("carouselMaps");
            if (myCarouselEl) {
                const myCarousel = new Carousel(myCarouselEl);
                myCarousel.to(0);
            }
        }
    }, [state]);

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

        // if (busy > 0)
        //     message += "busy";
        // message += state;

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
                {state > 1 ?//state > 1 ?
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
                            aria-label="Precipitation"></button>
                        <button
                            type="button"
                            data-te-target="#carouselMaps"
                            data-te-slide-to="1"
                            className="mx-[3px] box-content h-[4px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                            aria-label="Home city forecast"></button>
                        <button
                            type="button"
                            data-te-target="#carouselMaps"
                            data-te-slide-to="2"
                            className="mx-[3px] box-content h-[4px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                            aria-label="Charts"></button>
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
                            aria-label="Splash"></button>
                    </div>}


                {/* <!--Carousel items--> */}
                <div
                    className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                    {state > 1 || state < 0 ?
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
                                <div ref={ref} className="relative">
                                    <img src="/map_nz.png" className="block w-full z-0" onContextMenu={handleContextMenu} />
                                    {busy > 0 ? <WIcon wc={101} x={(84 * ratio).toFixed(0)} y={(137 * ratio).toFixed(0)} z={1}></WIcon> : <></>}
                                    <div className="absolute z-1 opacity-90 text-xs font-semibold text-indigo-600" style={{ left: (374 * ratio).toFixed(0) + "px", top: (530 * ratio).toFixed(0) + "px" }}>
                                        <div className="w-24 break-words">
                                        {(state == 2 || state == 4) ? "Processing.." : state < 0 ? "Error!" : (cityData ? (cityData.wc[0] > cityData.wc[1] ? get_wc_string(cityData.wc[0]) : get_wc_string(cityData.wc[1])) : "")}
                                        </div>
                                    </div>
                                    <div className="absolute z-1 opacity-80 text-xs"
                                        style={{ left: (380 * ratio).toFixed(0) + "px", top: (590 * ratio).toFixed(0) + "px" }}>
                                        <div className="w-3 h-3 shadow-[2px_2px_2px_1px_#404040] bg-neutral-700 inline-block"></div>
                                        <span>&nbsp;&nbsp;Rain</span>
                                    </div>
                                    <div className="absolute z-1 opacity-80 text-xs"
                                        style={{ left: (380 * ratio).toFixed(0) + "px", top: (613 * ratio).toFixed(0) + "px" }}>
                                        <div className="w-3 h-3 shadow-[2px_2px_2px_1px_#00FFFF] inline-block" style={{ background: '#00FFFF' }}></div>
                                        <span>&nbsp;&nbsp;Snow</span>
                                    </div>
                                    {cities.map(a => <WIcon key={a.city + "-" + a.area + "-icon"} wc={a.wc[0] > a.wc[1] ? a.wc[0] : a.wc[1]} x={(a.x * ratio).toFixed(0)} y={(a.y * ratio).toFixed(0)} z={1}></WIcon>)}
                                </div>
                                {/* <div
                                    className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                    <h5 className="text-xl">First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div> */}
                                {/* {frame} */}

                            </div>
                            {/* <!--Second item--> */}
                            <div
                                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none backface-hidden"
                                data-te-carousel-item >
                                <img
                                    src="/azure.png"
                                    className="block w-full -z-10"
                                    alt="..." />
                                <div className="absolute top-0 left-0 -z-0">
                                    <MyCity data={cityData}></MyCity>
                                </div>

                                {/* <div
                                    className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                    <h5 className="text-xl">Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div> */}
                            </div>
                            {/* <!--Third item--> */}
                            <div
                                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none backface-hidden"
                                data-te-carousel-item >
                                <img
                                    src="/azure.png"
                                    className="block w-full"
                                    alt="..." />
                                <div className="absolute top-0 left-0 -z-0">
                                    <MyCharts data={cityData}></MyCharts>
                                </div>
                                {/* <div
                                    className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                    <h5 className="text-xl">Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div> */}
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
                            <img src="/map_nz.png" className="block w-full z-0" onContextMenu={handleContextMenu} />
                            {/* <div
                                className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                <h5 className="text-xl">First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div> */}
                        </div>}
                </div>

                {state > 1 ?//=== 3 && busy === 0 ?
                    <>
                        {/* <!--Carousel controls - prev item--> */}
                        <button
                            className="absolute bottom-0 left-0 top-1/2 transform -translate-y-1/2 z-[1] flex w-[15%] h-[30%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
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
                            className="absolute bottom-0 right-0 top-1/2 transform -translate-y-1/2 z-[1] flex w-[15%] h-[30%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
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