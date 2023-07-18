// Initialization for ES Users
import {
    initTE
} from "tw-elements";
import { useEffect, useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { DataType } from "@/app/dataContext";
import { DataContext } from "@/app/dataContext";
import { __date, __day } from "@/app/dataHub";
// import the icons you need
import { WiThermometer, WiStormWarning, WiRaindrop, WiSnowflakeCold, WiDaySunny } from 'react-icons/wi';
import WIcon from "./icons";
import { get_wc_string } from "./icons";


const MyCity = ({ data }: { data: DataType | undefined }) => {
    // const { cities, setCities, homeCity, setHomeCity } = useContext(DataContext);

    useEffect(() => {
        // initTE({ Collapse, Ripple });
    }, []);

    return (
        <div className="mx-3 mt-3 w-96 space-y-2">
            <div className="grid grid-cols-2 justify-center items-center">
                <span className="font-bold text-2xl text-white drop-shadow-lg shadow-black">{data?.city}</span>
                <span className="text-lg align-center font-extrabold text-blue-600 drop-shadow-md shadow-blue-600/50">{data?.area}</span>
            </div>
            <div>
                {[0, 1, 2, 3, 4, 5, 6].map(a => <div key={"weather-day-" + a}>
                    <div className="w-96 text-sm space-x-3 mb-px bg-slate-600 text-zinc-100">

                        <div className="grid grid-cols-3 justify-center items-center">
                            <span className="text-center">{__date[a]}</span>
                            <span className="flex justify-center items-center text-base"><WIcon wc={(data?.wc[a])} /><em className="text-[8px]">{get_wc_string(data?.wc[a])}</em></span>
                            <span className="text-center">{__day[a]}</span>
                        </div>
                        <div className="grid grid-cols-5">
                            <div className="grid grid-cols-2 items-center justify-self-center">
                                <span className="flex justify-end"><WiThermometer /></span><span>°C</span><span className="col-span-2 text-center">{data?.temp[a]}</span>
                            </div>
                            <div className="grid grid-cols-2 items-center justify-self-center">
                                <span className="flex justify-end"><WiStormWarning /></span><span>km/h</span><span className="col-span-2 text-center">{data?.wind[a]}</span>
                            </div>
                            <div className="grid grid-cols-2 items-center justify-self-center">
                                <span className="flex justify-end"><WiRaindrop /></span><span>mm</span><span className="col-span-2 text-center">{data?.rain[a]}</span>
                            </div>
                            <div className="grid grid-cols-2 items-center justify-self-center">
                                <span className="flex justify-end"><WiSnowflakeCold /></span><span>cm</span><span className="col-span-2 text-center">{data?.snow[a]}</span>
                            </div>
                            <div className="grid grid-cols-2 items-center justify-self-center">
                                <span className="flex justify-end"><WiDaySunny /></span><span></span><span className="col-span-2 text-center">{data?.uv[a]}</span>
                            </div>

                        </div>

                    </div>
                </div>)}
            </div>

        </div>
    )
}

export default MyCity;