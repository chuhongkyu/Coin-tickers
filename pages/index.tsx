import Head from 'next/head'
import Layout from 'components/Layout'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { isDarkAtom } from 'utils/atom';
import Main from 'components/Main';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from "next/router"


export default function Index() {
  const isDark = useRecoilValue<boolean>(isDarkAtom);
  const setDark = useSetRecoilState<boolean>(isDarkAtom);
  const router = useRouter()
  
  const toggleDarkMode = () => {
    setDark((prev) => !prev); // Recoil 상태를 업데이트하여 테마를 변경합니다.
  };

  useEffect(()=>{
    if (window.matchMedia) {
      const query = window.matchMedia('(prefers-color-scheme: dark)');
      if(query.matches){
        setDark(true);
      }else{
        setDark(false);
      }
    }
  },[])

  useEffect(() => {
    if (isDark) {
      window.document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      window.document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]); 

  // useEffect(()=> {
  //   console.log('router',router.query)
  // },[router])

  return (
    <>
      <Head>
        <title>Coin Tickers</title>
        <meta name="description" content="coin-tickers" />
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
