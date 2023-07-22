// Initialization for ES Users
import {
    Select,
    Ripple,
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

// import CityCU from "./cityCU";
const CityCU = dynamic(() => import("./cityCU"), { ssr: false });
import { CityType } from "@/app/dataContext";


const CityList = () => {
    // const [area, setArea] = useState('');
    const [cities, setCities] = useState<CityType[]>([]);
    const { token } = useContext(DataContext);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        initTE({ Ripple, Select });

        const mySelect = document.getElementById('selectRegion');
        // const select = new Select(mySelect);
        // select?.setValue('');
        mySelect?.addEventListener('optionSelect.te.select', (e: any) => {
            // console.log(e.target?.value)
            // do something...
            if (e.target?.value === "")
                return;
            setArea(e.target?.value);
            setMessage("");
            const xhr = new XMLHttpRequest();
            const url = process.env.BACKEND+'api/cities/' + e.target?.value;
            // console.log(url);
            xhr.open("GET", url);

            // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            // request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
            // request.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Accept', 'application/JSON');
            xhr.send();

            xhr.onreadystatechange = (e) => {

                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const status = xhr.status;
                    if (status === 0 || (status >= 200 && status < 400)) {
                        // The request has been completed successfully
                        // console.log(status);
                        if (status == 200) {
                            // console.log(JSON.parse(xhr.response)?.data);
                            setCities(JSON.parse(xhr.response)?.data);
                            // console.log(JSON.parse(xhr.response)?.token);
                        }
                    }
                    // console.log(xhr.responseText);
                } else {
                    // Oh no! There has been an error with the request!
                    //reject("something went wrong!");
                }
            }
        });
    }, []);


    /**
     * This function works fine, but I commented out because it's risky of losing data
     * @param e 
     * @param id 
     */
    const handleDelLocation = (e: any, id: string) => {
        e.preventDefault();
        // const xhr = new XMLHttpRequest();
        // const url = process.env.BACKEND+'api/build/city';
        // xhr.open("DELETE", url);

        // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // xhr.setRequestHeader('Authorization', 'Basic ' + token);
        // xhr.setRequestHeader('Accept', 'application/json');
        // xhr.send(JSON.stringify({ id: id }));

        // xhr.onreadystatechange = (e) => {

        //     if (xhr.readyState === XMLHttpRequest.DONE) {
        //         const status = xhr.status;
        //         if (status === 0 || (status >= 200 && status < 400)) {
        //             // The request has been completed successfully
        //             // console.log(status);
        //             if (status == 200 && JSON.parse(xhr.response)?.result === 200) {
        //                 // console.log(JSON.parse(xhr.response)?.token);

        //             }
        //         }
        //         setMessage(xhr.responseText);
        //         // console.log(xhr.responseText);
        //     } else {
        //         // Oh no! There has been an error with the request!
        //         //reject("something went wrong!");
        //     }
        // }

    }

    const handleAddLocation = (e: any) => {
        // e.target?.parentNode.appendChild(child)
        setId("");
        setName("");
        // setArea("");
        setCoordinates("");

        Toast.getInstance(document.getElementById('city_CU')).show();
        setX(e.target?.getBoundingClientRect().x || 0);
        setY(e.target?.getBoundingClientRect().y || 0);

        // console.log(e.target?.getBoundingClientRect())
    }

    const handleEditLocation = (e: any, id: string, name: string, area: string, coordinates: string) => {
        // e.target?.parentNode.appendChild(child)
        setId(id);
        setName(name);
        setArea(area);
        setCoordinates(coordinates);
        Toast.getInstance(document.getElementById('city_CU')).show();

        // console.log(document.getElementById('locations-list'))
        if (document.getElementById('locations-list') !== null)
            setX(document.getElementById('locations-list')?.getBoundingClientRect().x || 0);
        setY(e.target?.parentNode?.getBoundingClientRect().y);
        // console.log(e.target?.parentNode.getBoundingClientRect())
    }


    return (

        <>
            <nav
                className="w-full rounded-md bg-neutral-100 px-5 py-3 dark:bg-neutral-600">
                <ol className="list-reset flex">
                    <li>
                        <Link href="/"
                            className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                            Home
                        </Link>
                    </li>
                    <li>
                        <span className="mx-2 text-neutral-500 dark:text-neutral-300">&gt;</span>
                    </li>
                    <li className="text-neutral-500 dark:text-neutral-300">Locations</li>
                </ol>
            </nav>

            <div className="relative mx-3 my-2" data-te-input-wrapper-init>
                <select id="selectRegion" data-te-select-init data-te-select-size="lg">
                    <option value="AUK">AUK</option>
                    <option value="BOP">BOP</option>
                    <option value="CAN">CAN</option>
                    <option value="GIS">GIS</option>
                    <option value="HKB">HKB</option>
                    <option value="MBH">MBH</option>
                    <option value="MWT">MWT</option>
                    <option value="NSN">NSN</option>
                    <option value="NTL">NTL</option>
                    <option value="OTA">OTA</option>
                    <option value="STL">STL</option>
                    <option value="TAS">TAS</option>
                    <option value="TKI">TKI</option>
                    <option value="WGN">WGN</option>
                    <option value="WKO">WKO</option>
                    <option value="WTC">WTC</option>
                </select>
                <label data-te-select-label-ref>Select Region</label>
            </div>
            <p>{message}</p>
            <div id="locations-list" className="mx-3 mb-3">
                <CityCU id={id} name={name} area={area} coordinates={coordinates} x={x} y={y}></CityCU>
                {token.length === 0 ? <></> : <button onClick={handleAddLocation}
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="azure"
                    className="inline-block rounded-full bg-primary p-2 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <FontAwesomeIcon
                        icon={faMapLocationDot}
                        className='text-xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                    />Add
                </button>}

                {cities.map(a => <div key={a._id} className="inline-block whitespace-nowrap rounded-full bg-neutral-50 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.85em] font-bold leading-none text-neutral-600">{a.name}{
                    token.length === 0 ? <></> : <span className="">
                        <button onClick={e => handleEditLocation(e, a._id, a.name, a.area, a.coordinates)}
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="azure"
                            className="inline-block rounded-full bg-primary p-2 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className='text-xs text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                            />
                        </button>
                        <button onClick={e => handleDelLocation(e, a._id)}
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="azure"
                            className="inline-block rounded-full bg-primary p-2 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className='text-xs text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                            />
                        </button>
                    </span>
                }
                </div>)}
                {/* {cities.map(a=><CityItem key={a.city.replace(/\s+/, '') + "-accordian"}  data={a}></CityItem>)} */}
            </div>
        </>
    )
}

export default CityList;