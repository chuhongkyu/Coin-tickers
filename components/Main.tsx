'use client'

import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "utils/api";
import { ICoin } from "utils/interface";
import List from "./List";



const Main = () => {
    const { isLoading, error, data } = useQuery<ICoin[]>({
        queryKey: ['Data'],
        queryFn: fetchCoins,
    });

    return(
        <div id="main">
            <div className="wrapper">
                <div className="container">
                    {isLoading ? (<div className="loading">Loading</div>):
                    (<ul>
                        {data?.map((el) => <List key={el.id} coin={el}></List>)}
                        {/* {data?.map((el) => <li key={el.id}>{el.name}</li>)} */}
                    </ul>)}
                </div>
            </div>
        </div>      
    )
}

export default Main