'use client'
import './globals.css';
import { Rowdies, VT323, IBM_Plex_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuth } from '@/common/utils/storage';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogged = isAuth();
  const handleNewUserVisit = () => {
    const token = localStorage.getItem('jwt-token');
    if (!isLogged && pathname !== '/') {
      router.push("/");
    }
  };
  useEffect(() => {
    handleNewUserVisit();
  }, [])
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
          style={{backgroundImage: "url(/assets/images/bg.jpg)", backgroundAttachment: 'fixed'}}>
          <Header />
          <div className='px-10 w-full mt-40'>
            <div className='max-w-[1392px] w-full pb-40 m-auto'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
