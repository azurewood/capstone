// Initialization for ES Users
import {
    Ripple,
    Input,
    Toast,
    initTE
} from "tw-elements";
import { useEffect, useContext, useState } from "react";
import { DataContext } from "@/app/dataContext";
import type { DataType } from "@/app/dataContext";
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import {
    faPenToSquare, faTrash, faMapLocationDot, faLocationDot, faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import Locations from "./page";
// import SearchItem from "./searchItem";
// import CityItem from "./cityItem";
// const SearchItem = dynamic(() => import("./searchItem"), { ssr: false });
// const CityItem = dynamic(() => import("./cityItem"), { ssr: false });
// import { CityType } from "@/app/dataContext";


const CityCU = ({id, name, area, coordinates, x, y }: {id?:string, name?: string, area?: string, coordinates?: string, x?: number, y?: number }) => {
    const [Name, setName] = useState(name);
    const [Area, setArea] = useState(area);
    const [Coor, setCoor] = useState(coordinates);
    const { token } = useContext(DataContext);
    const [message, setMessage] = useState("");

    useEffect(() => {
        initTE({ Ripple, Toast });

        if (document.getElementById('city_CU'))
            Toast.getInstance(document.getElementById('city_CU')).hide();

    }, []);

    useEffect(() => {
        setName(name);
        setArea(area);
        setCoor(coordinates);
        setMessage("");
    }, [name, coordinates, area]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        const url = 'https://weather-nz.onrender.com/api/build/city';
        xhr.open(name === "" ? "POST" : "PUT", url);

        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader('Authorization', 'Basic ' + token);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(JSON.stringify({ name: Name, area: Area, coordinates: Coor }));

        xhr.onreadystatechange = (e) => {

            if (xhr.readyState === XMLHttpRequest.DONE) {
                const status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    // The request has been completed successfully
                    // console.log(status);
                    if (status == 200 && JSON.parse(xhr.response)?.result === 200) {
                        // console.log(JSON.parse(xhr.response)?.token);
                        if (document.getElementById('city_CU'))
                            Toast.getInstance(document.getElementById('city_CU')).hide();

                    }
                }
                setMessage(xhr.responseText);
                console.log(xhr.responseText);
            } else {
                // Oh no! There has been an error with the request!
                //reject("something went wrong!");
            }
        }


    }

    return (
        <>
            <div
                className="!visible fixed pointer-events-auto mx-auto hidden w-96 max-w-full rounded-lg bg-white bg-clip-padding text-sm shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden dark:bg-neutral-600"
                id="city_CU"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-te-autohide="false"
                data-te-toast-init
                data-te-toast-show="false" style={{ left: x?.toFixed(0) + "px", top: y?.toFixed(0) + "px" }}>
                <div
                    className="flex items-center justify-between rounded-t-lg border-b-2 border-neutral-100 border-opacity-100 bg-white bg-clip-padding px-4 pb-2 pt-2.5 dark:border-opacity-50 dark:bg-neutral-600">
                    <p className="font-bold text-lg text-neutral-500 dark:text-neutral-200">
                        {name === "" ? "Add a new location" : "Edit a location"}
                    </p>
                    <div className="flex items-center">
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">
                        </p>
                        <button
                            type="button"
                            className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            data-te-toast-dismiss
                            aria-label="Close">
                            <span
                                className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
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
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
                <div
                    className="break-words rounded-b-lg bg-white px-4 py-4 text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200">
                    <p>{message}</p>
                    <div
                        className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <form onSubmit={handleSubmit}>

                            {/* <!--name input--> */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    value={Name}
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="nameFormControlInput"
                                    placeholder={Name} onChange={(e) => setName(e.target?.value)}
                                />
                                <label
                                    htmlFor="nameFormControlInput"
                                    className="pointer-events-none absolute left-3 -top-5 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500"
                                >Name
                                </label>
                            </div>

                            {/* <!--area input--> */}
                            <div className="relative mb-4">
                                <input
                                    type="text" readOnly
                                    value={Area}
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="areaFormControlInput"
                                    placeholder={Area}
                                />
                                <label
                                    htmlFor="areaFormControlInput"
                                    className="pointer-events-none absolute left-3 -top-5 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500"
                                >Area
                                </label>
                            </div>

                            {/* <!--coordinates input--> */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    value={Coor}
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="coorFormControlInput"
                                    placeholder={Coor} onChange={(e) => setCoor(e.target?.value)}
                                />
                                <label
                                    htmlFor="coorFormControlInput"
                                    className="pointer-events-none absolute left-3 -top-5 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500"
                                >Coordinates
                                </label>
                            </div>


                            {/* <!--Submit button--> */}
                            <button
                                type="submit"
                                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CityCU;