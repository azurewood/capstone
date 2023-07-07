// "use client"

import './globals.css'
import Head from 'next/head'
// import { Inter } from 'next/font/google'
import "tw-elements/dist/css/tw-elements.min.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

// const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Weather NZ',
  description: '7 days weather forecast for New Zealand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>{metadata.title}</title>
      <Head>
        <meta name="description" content={metadata.description} />
      </Head>
      {/* <body classNameName={inter.classNameName}>{children}</body> */}
      {/* <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style> */}
      <body className={roboto.className+" max-w-lg mx-auto"}>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div className='overflow-hidden'>
          {children}
        </div>

      </body>
    </html>
  )
}