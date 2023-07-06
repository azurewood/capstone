"use client"

import Layout from '@/components/layout';
import dynamic from 'next/dynamic'

const Slides = dynamic(() => import("@/components/slides"), { ssr: false });


export default function Home() {

    return (
        <Layout>
            <Slides></Slides>
            
        </Layout>
    )
}
