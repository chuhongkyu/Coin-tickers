import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "utils/api";
import { ICoin } from "utils/interface";


const Main = () => {
    const { isLoading, error, data } = useQuery<ICoin[]>({
        queryKey: ['repoData'],
        queryFn: fetchCoins,
    });
    return(
            <div id="main">
                <div className="wrapper">
                    <div className="container">
                        {isLoading ? (<div className="loading">Loading</div>):
                        (<ul>
                            {data?.map((el) => <li key={el.id}>{el.name}</li>)}
                        </ul>)}
                    </div>
                </div>
            </div>      
    )
}

export default Main