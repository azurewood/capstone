"use client"

import Layout from '@/components/layout';
import dynamic from 'next/dynamic'
import { DataContext } from "@/app/dataContext";
import { useContext } from 'react';

const CityList = dynamic(() => import("./cityList"), { ssr: false });


export default function Locations() {
    // const { data, setCities } = 
    useContext(DataContext);

    return (
        <Layout>
            <CityList />
        </Layout>
    )
}