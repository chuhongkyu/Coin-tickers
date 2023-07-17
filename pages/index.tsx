import Head from 'next/head'
import Layout from 'components/Layout'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { isDarkAtom } from 'utils/atom';
import Main from 'components/Main';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


export default function Index() {
  const isDark = useRecoilValue<boolean>(isDarkAtom);
  const setDark = useSetRecoilState<boolean>(isDarkAtom)

  const toggleDarkMode = () => {
    // setDark((prev) => !prev);
    if(isDark){
      window.document.documentElement.setAttribute("data-theme", "dark");
    }else{
      window.document.documentElement.setAttribute("data-theme", "light");
    }
  };

  useEffect(()=>{
    if (window.matchMedia) {
      const query = window.matchMedia('(prefers-color-scheme: dark)');
      console.log(query.matches)
      if(query.matches){
        setDark(true);
      }else{
        setDark(false);
      }
      toggleDarkMode()
    }
  },[])

  return (
    <>
      <Head>
        <title>Coin Tickers</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Main></Main>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
