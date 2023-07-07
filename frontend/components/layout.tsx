import React from "react";
import dynamic from 'next/dynamic'
import Footer from "./footer";

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div>
        <Navbar />
      </div>

      <div>
        <main>{children}</main>
      </div>

      <Footer />
    </div>
  );
}