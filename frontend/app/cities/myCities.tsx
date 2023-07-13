// Initialization for ES Users
import {
    Collapse,
    Input,
    Ripple,
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
    faHeartCirclePlus
} from "@fortawesome/free-solid-svg-icons";
// import SearchItem from "./searchItem";
// import CityItem from "./cityItem";
const SearchItem = dynamic(() => import("./searchItem"), { ssr: false });
const CityItem = dynamic(() => import("./cityItem"), { ssr: false });

const MyCities = () => {
    const [search, setSearch] = useState('');
    const { data, cities } = useContext(DataContext);
    const [searchResult, setSearchResult] = useState<DataType[]>([]);

    useEffect(() => {
        initTE({ Input, Collapse, Ripple });
    }, []);

    function liveSearch(value: string) {
        // console.log(data.length);
        setSearchResult([...data.filter(a => {
            // console.log(a.city)
            if (a.city.toLowerCase().includes(value.toLowerCase())) {
                const b = { ...a };
                // console.log(b.city);
                return { area: b.area, city: b.city, wc: [...b.wc], x: b.x, y: b.y, temp: [...b.temp], wind: [...b.wind], rain: [...b.rain], snow: [...b.snow], uv: [...b.uv] }
            }
        })]);
    }

    useEffect(() => {
        // const searchCollapseEl = document.getElementById('searchCollapse');
        // if (searchCollapseEl) {
        //     const searchCollapse = new Collapse(searchCollapseEl);
        //     searchCollapse.show();

        if (search.length > 2) {
            liveSearch(search);
            // searchCollapse.show();

            // searchCollapseEl.classList.remove("hidden");
            // searchCollapseEl.classList.add("!visible","h-px", "w-px");
        }
        else {
            setSearchResult([]);
            // searchCollapseEl.classList.add("hidden");
            // searchCollapse.hide();
        }

        // console.log(search);
        // }


    }, [search]);


    useEffect(() => {
        const searchCollapseEl = document.getElementById('searchCollapse');
        if (searchCollapseEl) {
            const searchCollapse = new Collapse(searchCollapseEl);
            searchCollapse.show();
        }

    }, [searchResult]);


    // let typingTimer: any; //add a little bit of delay
    // let typeInterval = 500;

    const handleSearch = (e: any) => {
        setSearch(e.target.value.replace(/^\s+/, ''));
        // console.log(e.target.value);
        // const searchCollapseEl = document.getElementById('searchCollapse');
        // if (searchCollapseEl) {
        //     const searchCollapse = new Collapse(searchCollapseEl)
        //     if (e.target.value.trim().length > 3) {
        //         clearTimeout(typingTimer);
        //         typingTimer = setTimeout(liveSearch, typeInterval, e.target.value.trim());
        //         console.log(search);
        //         searchCollapse.show();
        //     }
        //     else {
        //         setSearchResult([]);
        //         searchCollapse.hide();
        //     }
        // }
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
                    <li className="text-neutral-500 dark:text-neutral-300">My Cities</li>
                </ol>
            </nav>

            <div className="relative mx-3 my-2" data-te-input-wrapper-init>
                <input
                    type="search"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="citySearch"
                    placeholder="Type query" value={search} onChange={handleSearch} />
                <label
                    htmlFor="citySearch"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Search</label>
            </div>

            <div className="!visible hidden mx-3 my-2 space-y-1 transition-multiple duration-300 transition-slowest ease" id="searchCollapse"
                data-te-collapse-item
                data-te-collapse-horizontal>
                <div
                    className="block w-[350px] max-w-sm px-2 m-1 space-y-1 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 dark:text-neutral-50">

                    {searchResult.map(a =>
                        <SearchItem key={a.city.replace(/\s+/, '') +"-search-result"} data={a}></SearchItem>)}
                </div>

            </div>

            <div id="accordion-cities" className="mx-3 mb-3">
                {cities.map(a=><CityItem key={a.city.replace(/\s+/, '') + "-accordian"}  data={a}></CityItem>)}
            </div>
        </>
    )
}

export default MyCities;