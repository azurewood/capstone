"use client"

import Layout from '@/components/layout';
import dynamic from 'next/dynamic'
import { DataContext } from "@/app/dataContext";
import { useContext } from 'react';

const MyCities = dynamic(() => import("./myCities"), { ssr: false });


export default function Cities() {
    // const { data, setCities } = 
    useContext(DataContext);

    return (
        <Layout>
            <MyCities />
        </Layout>
    )
}