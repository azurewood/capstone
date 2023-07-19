"use client"

import Layout from '@/components/layout';
import dynamic from 'next/dynamic'

const LoginUI = dynamic(() => import("@/app/admin/login/loginUI"), { ssr: false });


export default function Login() {

    return (
        <Layout>
            <LoginUI></LoginUI>
            
        </Layout>
    )
}