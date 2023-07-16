// Initialization for ES Users
import {
    Chart,
    initTE
} from "tw-elements";
import { useEffect, useContext, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { DataType } from "@/app/dataContext";
import { DataContext } from "@/app/dataContext";
import { __date, __day } from "@/app/dataHub";
// import the icons you need


const MyCharts = ({ data }: { data: DataType | undefined }) => {


    useEffect(() => {
        initTE({ Chart });
    }, []);

    useEffect(() => {

        // Chart        
        const windRadar = {
            type: 'radar',
            pointBorderColor: ['#222111', '#ddd111'],
            data: {
                labels: __day,
                datasets: [
                    {
                        label: 'Wind',
                        data: data?.wind,
                        backgroundColor: 'rgba(101, 163, 13, 0.2)',
                        borderColor: 'rgba(29, 78, 216, 0.6)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Temperature',
                        data: data?.temp,
                        borderColor: '#eedfcd',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderWidth: 2,
                    },
                ],
            },
        };
        const instance = Chart.getInstance(document.getElementById('wind-radar-chart'));
        if (instance)
            instance.dispose();

        if (data?.wind && data?.temp) {
            const ele = document.getElementById('wind-radar-container');
            if (ele)
                ele.innerHTML = '<canvas id="wind-radar-chart"></canvas>';

            new Chart(document.getElementById('wind-radar-chart'), windRadar);
        }
    }, [data?.wind, data?.temp]);

    useEffect(() => {

        // Chart        
        const rainBar = {
            type: 'bar',
            data: {
                labels: __day,
                datasets: [
                    {
                        label: 'Rain',
                        data: data?.rain,
                        backgroundColor: 'rgba(101, 163, 13, 0.2)',
                        borderColor: 'rgba(29, 78, 216, 0.6)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Snow',
                        data: data?.snow,
                        borderColor: '#eedfcd',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderWidth: 2,
                    },
                ],
            },
        };
        const instance = Chart.getInstance(document.getElementById('rain-snow-chart'));
        if (instance)
            instance.dispose();

        if (data?.rain && data?.snow) {
            const ele = document.getElementById('rain-snow-container');
            if (ele)
                ele.innerHTML = '<canvas id="rain-snow-chart"></canvas>';

            new Chart(document.getElementById('rain-snow-chart'), rainBar);
        }
    }, [data?.rain, data?.snow]);


    useEffect(() => {
        // Chart        
        const tempLine = {
            type: 'line',
            data: {
                labels: __day,
                datasets: [
                    {
                        label: 'UV',
                        data: data?.uv,
                        backgroundColor: 'rgba(101, 163, 13, 0.2)',
                        borderColor: 'rgba(29, 78, 216, 0.6)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Temperature',
                        data: data?.temp,
                        borderColor: '#eedfcd',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderWidth: 2,
                    },
                ],
            },
        };
        const instance = Chart.getInstance(document.getElementById('temp-uv-chart'));
        if (instance)
            instance.dispose();

        if (data?.temp && data?.uv) {
            const ele = document.getElementById('temp-uv-container');
            if (ele)
                ele.innerHTML = '<canvas id="temp-uv-chart"></canvas>';

            new Chart(document.getElementById('temp-uv-chart'), tempLine);
        }
    }, [data?.temp, data?.uv]);


    return (
        <div className="mx-3 mt-3 w-96 space-y-2">
            <div className="grid grid-cols-2 justify-center items-center">
                <span className="font-bold text-2xl text-white drop-shadow-lg shadow-black">{data?.city}</span>
                <span className="text-lg align-center font-extrabold text-blue-600 drop-shadow-md shadow-blue-600/50">{data?.area}</span>
            </div>
            <div>
                <div className="mx-auto w-3/5 overflow-hidden">
                    <div id="wind-radar-container">
                    </div>
                </div>

                <div className="mx-auto w-3/5 overflow-hidden">
                    <div id="rain-snow-container">
                    </div>
                </div>

                <div className="mx-auto w-3/5 overflow-hidden">
                    <div id="temp-uv-container">
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MyCharts;