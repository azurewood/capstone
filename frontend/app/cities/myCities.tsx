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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import {
    faHeartCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import SearchItem from "./searchItem";

const MyCities = () => {
    const [search, setSearch] = useState('');
    const { data, cities, setCities } = useContext(DataContext);
    const [searchResult, setSearchResult] = useState<DataType[]>([]);

    useEffect(() => {
        initTE({ Collapse, Input, Ripple });
    }, []);

    // let searchResult:DataType[] = [];
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

    let typingTimer: any; //add a little bit of delay
    let typeInterval = 500;
    const searchCollapseEl = document.getElementById('searchCollapse');
    const searchCollapse = new Collapse(searchCollapseEl)

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
        // console.log(e.target.value);
        if (e.target.value.trim().length > 3) {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(liveSearch, typeInterval, e.target.value.trim());
            searchCollapse.show();
        }
        else {
            setSearchResult([]);
            searchCollapse.hide();
        }


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

            <div className="!visible hidden mx-3 my-2 space-y-1" id="searchCollapse" data-te-collapse-horizontal data-te-collapse-item>
                <div
                    className="block w-[300px] max-w-sm px-2 m-1 space-y-1 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 dark:text-neutral-50">

                    {searchResult.map(a =>
                        <SearchItem key={a.city} city={a.city} area={a.area}></SearchItem>)}
                </div>

            </div>

            <div id="accordionExample" className="mx-3 mb-3">
                <div
                    className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingOne">
                        <button
                            className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                            type="button"
                            data-te-collapse-init
                            data-te-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne">
                            Accordion Item #1
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
                        id="collapseOne"
                        className="!visible"
                        data-te-collapse-item
                        data-te-collapse-show
                        aria-labelledby="headingOne"
                        data-te-parent="#accordionExample">
                        <div className="px-5 py-4">
                            <strong>This is the first item's accordion body.</strong> It is
                            shown by default, until the collapse plugin adds the appropriate
                            classNamees that we use to style each element. These classNamees control
                            the overall appearance, as well as the showing and hiding via CSS
                            transitions. You can modify any of this with custom CSS or
                            overriding our default variables. It's also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default MyCities;