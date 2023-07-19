// Initialization for ES Users
import {
    Input,
    Ripple,
    initTE,
} from "tw-elements";
import { useEffect, useContext, useState } from "react";
import { DataContext } from "@/app/dataContext";
import { useRouter } from 'next/navigation';

const LoginUI = () => {
    const { setToken } = useContext(DataContext);
    const { push } = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        initTE({ Ripple, Input });
    }, []);

    const handleSubmit = (e: any) => {
        // console.log("hi");
        e.preventDefault();
        // console.log(password,username)

        const xhr = new XMLHttpRequest();
        const url = 'https://weather-nz.onrender.com/login';
        xhr.open("POST", url);

        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        // request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
        // request.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({ username: username, password: password }));

        xhr.onreadystatechange = (e) => {

            if (xhr.readyState === XMLHttpRequest.DONE) {
                const status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    // The request has been completed successfully
                    // console.log(status);
                    if (status == 200) {
                        setToken(JSON.parse(xhr.response)?.token);
                        // console.log(JSON.parse(xhr.response)?.token);
                        return push('/');
                    }
                }
                // console.log(xhr.responseText);
            } else {
                // Oh no! There has been an error with the request!
                //reject("something went wrong!");
            }
        }

    }

    return (
        <>
            <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
                <div className="container h-full p-2">
                    <div
                        className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div
                                className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                <div className="g-0 lg:flex lg:flex-wrap">
                                    {/* <!-- Left column container--> */}
                                    <div className="px-4 md:px-0 lg:w-6/12">
                                        <div className="md:mx-6 md:p-12">
                                            {/* <!--Logo--> */}
                                            <div className="text-center pt-5">
                                                <img
                                                    className="mx-auto h-16"
                                                    src="/icon.png"
                                                    alt="logo" />
                                                <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">

                                                </h4>
                                            </div>

                                            <form onSubmit={handleSubmit}>
                                                <p className="mb-4">Please login to your account</p>
                                                {/* <!--Username input--> */}
                                                <div className="relative mb-4" data-te-input-wrapper-init>
                                                    <input
                                                        type="text"
                                                        value={username}
                                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Username
                                                    </label>
                                                </div>

                                                {/* <!--Password input--> */}
                                                <div className="relative mb-4" data-te-input-wrapper-init>
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                        id="exampleFormControlInput11"
                                                        placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                                    <label
                                                        htmlFor="exampleFormControlInput11"
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >Password
                                                    </label>
                                                </div>

                                                {/* <!--Submit button--> */}
                                                <div className="mb-12 pb-1 pt-1 text-center">
                                                    <button
                                                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        type="submit"
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light"
                                                        style={{ background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)' }}>
                                                        Log in
                                                    </button>

                                                    {/* <!--Forgot password link--> */}
                                                    {/* <a href="#!">Forgot password?</a> */}
                                                </div>

                                                {/* <!--Register button--> */}
                                                {/* <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 mr-2">Don't have an account?</p>
                                                    <button
                                                        type="button"
                                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light">
                                                        Register
                                                    </button>
                                                </div> */}
                                            </form>
                                        </div>
                                    </div>

                                    {/* <!-- Right column container with background and description--> */}
                                    <div
                                        className="flex backgroundImage items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                                        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                            <h4 className="mb-6 text-xl font-semibold">
                                                We are 
                                            </h4>
                                            <p className="text-sm">
                                                Lorem ipsum.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginUI; 