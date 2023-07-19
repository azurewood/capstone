import {
  Carousel,
  Sidenav,
  Ripple,
  initTE
} from "tw-elements";
import { useEffect, useState, useContext } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import {
  faEarthOceania, faCity, faUserAlt, faInfoCircle, faHardDrive, faGear
} from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "@/app/dataContext";
import { get_data } from '@/app/dataHub';
import { __temp_img } from "@/app/dataHub";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { state, setState, busy, setBusy, data, setData, setFrame, homeCity, cities, token, setToken } = useContext(DataContext);
  const { push } = useRouter();

  useEffect(() => {
    initTE({ Sidenav, Ripple });
  }, []);

  const saveData = () => {
    // console.log(data.length);
    // console.log(__temp_img.length);
    const sidenav = document.getElementById("sidenav-1");
    if (sidenav) {
      const sidenavInstance = new Sidenav(sidenav);
      sidenavInstance.hide();
    }


    // console.log(__temp_img.length);

    setTimeout(() => {
      localStorage.setItem("homeCity", JSON.stringify(homeCity));
      localStorage.setItem("cities", JSON.stringify(cities));
    }, 100);

  }


  const clearCache = () => {
    // console.log(data.length);
    // console.log(__temp_img.length);
    const sidenav = document.getElementById("sidenav-1");
    if (sidenav) {
      const sidenavInstance = new Sidenav(sidenav);
      sidenavInstance.hide();
    }


    // console.log(__temp_img.length);

    setTimeout(() => {
      while (__temp_img.length > 0) {
        __temp_img.pop();
      }
      setFrame(0);
      // const myCarouselEl = document.getElementById("carouselMaps");
      // const myCarousel = new Carousel(myCarouselEl);
      // myCarousel.to(0);
      if (data.length === 0) {
        setState(0);
        get_data().then(data => {
          console.log(data.length, state);
          // setData(data);
          setData(data.map(a => {
            const b = { ...a };
            // console.log(b.city);
            return { area: b.area, city: b.city, wc: [...b.wc], x: b.x, y: b.y, temp: [...b.temp], wind: [...b.wind], rain: [...b.rain], snow: [...b.snow], uv: [...b.uv] }
          }));
        }).catch(err => {
          console.log("error:", err.message);
          setState(-2);
        }).finally(() => {
          // console.log("end");
          setState(2);
          setBusy(1);
        });
      }

    }, 100);

  }

  const handleLogout = () => {
    // console.log(token.length);
    setToken("");
    // console.log(token);
    return push("/");
  }


  return (
    <>
      {/* <!-- Sidenav --> */}
      <nav
        id="sidenav-1"
        className="absolute left-0 top-0 z-[95] h-full w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
        data-te-sidenav-init
        data-te-sidenav-hidden="true"
        data-te-sidenav-position="absolute"
        data-te-sidenav-accordion="true">
        <a
          className="mb-3 flex items-center justify-center border-b-2 border-solid border-gray-100 py-6 outline-none"
          href="#!"
          data-te-ripple-init
          data-te-ripple-color="azure">
          <img
            id="te-logo"
            className="mr-2 w-6"
            src="/icon_sm.png"
            alt="Logo"
            draggable="false" />
          <span className="font-semibold">Weather NZ</span>
        </a>
        <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
          <li className="relative">
            <Link href="/" className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <FontAwesomeIcon
                  icon={faEarthOceania}
                  className='text-3xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                />
              </span>
              <span>Weather 7 Days</span>
            </Link>
          </li>
          <li className="relative">
            <Link href="/cities" className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <FontAwesomeIcon
                  icon={faCity}
                  className='text-3xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                />
              </span>
              <span>My Cities</span>
            </Link>
          </li>
          {/* <li className="relative">
            <a onClick={saveData}
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <FontAwesomeIcon
                  icon={faHardDrive}
                  className='text-3xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                />
              </span>
              <span>Save ..</span>
            </a>
          </li> */}
          <li className="relative">
            <a onClick={clearCache}
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <FontAwesomeIcon
                  icon={faGear}
                  className='text-3xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                />
              </span>
              <span>Clear Cache</span>
            </a>
          </li>
          <li className="relative">
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <FontAwesomeIcon
                  icon={faUserAlt}
                  className='text-3xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                />
              </span>
              <span>Admin</span>
              <span
                className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                data-te-sidenav-rotate-icon-ref>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd" />
                </svg>
              </span>
            </a>
            <ul
              className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
              data-te-sidenav-collapse-ref>
              <li className="relative">
                {token.length === 0 ?
                  <Link href="/admin/login" className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref>
                    <span>Login</span>
                  </Link> :
                  <a onClick={handleLogout} className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10" ><span>Logout</span></a>
                }

              </li>
              <li className="relative">
                <Link href="/admin/locations" className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref>
                  <span>Locations</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative">
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className='text-3xl text-azure-400 hover:text-azure-600 hover:cursor-pointer hover:-translate-y-px'
                />
              </span>
              <span>About</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* <!-- Sidenav --> */}

      {/* <!-- Toggler --> */}
      {busy ? <button
        className="disabled:opacity-75 fixed mob:absolute z-[95] top-0 right-2 mt-2 inline-block rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        data-te-sidenav-toggle-ref
        data-te-target="#sidenav-1"
        aria-controls="#sidenav-1"
        aria-haspopup="true" disabled>
        <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd" />
          </svg>
        </span>
      </button>
        : <button
          className="fixed mob:absolute z-[95] top-0 right-2 mt-2 inline-block rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          data-te-sidenav-toggle-ref
          data-te-target="#sidenav-1"
          aria-controls="#sidenav-1"
          aria-haspopup="true">
          <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd" />
            </svg>
          </span>
        </button>
      }

      {/* <!-- Toggler --> */}
    </>
  )
}

export default Navbar;