import 'styles/globals.css'
import 'styles/_app.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

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
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
    )
}