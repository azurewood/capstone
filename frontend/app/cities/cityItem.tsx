// Initialization for ES Users
import {
    Collapse,
    Ripple,
    initTE
} from "tw-elements";
import { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { DataType } from "../dataContext";
import { DataContext } from "../dataContext";
// import the icons you need
import {
    faBuildingCircleXmark, faTreeCity
} from "@fortawesome/free-solid-svg-icons";
// import { AppProps } from "next/app";

const CityItem = ({ data }: { data: DataType }) => {
    const { cities, setCities, homeCity, setHomeCity } = useContext(DataContext);

    useEffect(() => {
        initTE({ Collapse, Ripple });
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

    const handleSetHome = () => {
        setHomeCity(data.city);
    }

    const handleRemove = () => {
        const myCities: DataType[] = [];
        cities.forEach(a => {
            if (a.city !== data.city) {
                const b = { ...a };
                myCities.push({ area: b.area, city: b.city, wc: [...b.wc], x: b.x, y: b.y, temp: [...b.temp], wind: [...b.wind], rain: [...b.rain], snow: [...b.snow], uv: [...b.uv] })

            }
        });
        setCities(myCities);

    }


    return (

        <div
            className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
            <h2 className="mb-0" id={data.city.replace(/\s+/, '') + "-heading"}>
                <button
                    className="group relative flex w-full items-center gap-x-2 rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                    type="button"
                    data-te-collapse-init
                    data-te-target={"#" + data.city.replace(/\s+/, '') + "-collapse"}
                    aria-expanded="false"
                    aria-controls={data.city.replace(/\s+/, '') + "-collapse"}>
                    {data.city}
                    {data.city === homeCity ? <FontAwesomeIcon
                        icon={faTreeCity}
                        className='text-xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                    />
                        : <></>}
                    <span
                        className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </button>
            </h2>
            <div
                id={data.city.replace(/\s+/, '') + "-collapse"}
                className="!visible"
                data-te-collapse-item
                aria-labelledby={data.city.replace(/\s+/, '') + "-heading"}
                data-te-parent="#accordion-cities">
                <div className="px-5 py-4">
                    {data.area}
                    <div className="flex flex-row justify-end gap-x-3 gap-y-1">
                        <button onClick={handleSetHome}
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="azure"
                            className="inline-block rounded-full bg-primary p-2 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            <FontAwesomeIcon
                                icon={faTreeCity}
                                className='text-xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                            />Set Home
                        </button>
                        <button onClick={handleRemove}
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="azure"
                            className="inline-block rounded-full bg-primary p-2 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            <FontAwesomeIcon
                                icon={faBuildingCircleXmark}
                                className='text-xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                            />Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default CityItem;