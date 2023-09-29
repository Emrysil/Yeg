import './globals.css';
import type { Metadata } from 'next';
import { Rowdies, VT323, IBM_Plex_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Head from 'next/head';
const rowdies = Rowdies({
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rowdis',
});
const vt323 = VT323({
  weight: '400',
  subsets:['latin'],
  variable: '--font-vt323',
  display: 'swap'
})
const plex_sans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'], 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})
export const metadata: Metadata = {
  title: 'PSA-Yeg Talent Acquisition System',
  description: 'Discover the Best Talent',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link 
          rel="icon" 
          href="/favicon.ico" 
          sizes="any" />
      </Head>
      <body className={`${plex_sans.variable} ${rowdies.variable} ${vt323.variable}`}>
        <div 
          className='flex flex-col gap-10 min-h-screen items-center w-full bg-background-200 text-primary-100 bg-no-repeat' 
          style={{backgroundImage: "url(/assets/images/bg.jpg)"}}>
          <Header />
          <div className='px-10 w-full'>
            <div className='max-w-[1392px] w-full pb-40 m-auto'>
              {children}
            </div>
          </div>
        </div>
        </body>
    </html>
  )
}
