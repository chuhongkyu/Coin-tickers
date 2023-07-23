import 'styles/global.scss'
import 'styles/_app.scss'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { RecoilRoot } from 'recoil'
import { 
  Hydrate,
  QueryClient,
  QueryClientProvider, } from '@tanstack/react-query'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  
  const resizeHandler = () =>  {
    const maxWidth = 656;
    let vw = Math.min(window.innerWidth, maxWidth) * 0.01;
    document.documentElement.style.setProperty('--uw', `${vw}px`);
    document.documentElement.style.setProperty('--100vh', `${window.innerHeight}px`);
  }


  useEffect(() => {
    resizeHandler()
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, []);

  return (
    
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <AnimatePresence>
              <Component {...pageProps} />
            </AnimatePresence>
          </RecoilRoot>
        </Hydrate>
        
      </QueryClientProvider>
    
    )
}