'use client'

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fetchCoins } from "utils/api";
import { isDarkAtom } from "utils/atom";
import { ICoin } from "utils/interface";
import List from "./List";



const Main = () => {
    const { isLoading, data } = useQuery<ICoin[]>({
        queryKey: ['Data'],
        queryFn:  fetchCoins,
    });

    const isDark = useRecoilValue<boolean>(isDarkAtom);
    const setDark = useSetRecoilState<boolean>(isDarkAtom)

    const toggleDarkMode = () => {
        setDark((prev) => !prev);
    };

    useEffect(() => {
        if(isDark){
            if (typeof window !== 'undefined') {
                window.document.documentElement.setAttribute("data-theme", "dark");
            }
        }else{
            if (typeof window !== 'undefined') {
                window.document.documentElement.setAttribute("data-theme", "light");
            }
        }
    }, [])

    return(
        <div id="main">
            <div className="wrapper">
                <div className="btn-container">
                    <h1>Cloud Coin</h1>
                    <button onClick={toggleDarkMode}>
                        <span>☁︎</span>
                    </button>
                </div>
                <div className="container">
                    {isLoading ? (<div className="loading">Loading</div>):
                    (<ul>
                        {data?.slice(0, 20).map((el) => <List key={el.id} coin={el}></List>)}
                        {/* {data?.map((el) => <li key={el.id}>{el.name}</li>)} */}
                    </ul>)}
                </div>
            </div>
        </div>      
    )
}

export default Main