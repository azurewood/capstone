// Initialization for ES Users
import {
    Ripple,
    initTE
} from "tw-elements";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import {
    faHeartCirclePlus
} from "@fortawesome/free-solid-svg-icons";
// import { AppProps } from "next/app";

const SearchItem = (props: any) => {

    useEffect(() => {
        initTE({ Ripple });
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4">
            <span className="col-span-2">{props.city}</span><span>{props.area}</span><button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                className="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                <FontAwesomeIcon
                    icon={faHeartCirclePlus}
                    className='text-xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                />
            </button>
        </div>
    )
}

export default SearchItem;