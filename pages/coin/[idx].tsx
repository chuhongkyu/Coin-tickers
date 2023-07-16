import { useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Layout from "components/Layout"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { fetchCoinInfo, fetchCoinTickers } from "utils/api"
import { IInfoData, IPriceData } from "utils/interface"

const Coin:React.FC = () => {
    const router = useRouter()
    const { idx } = router.query as { idx: string };
//   const { state } = useLocation() as RouterState;
//   const priceMatch = useMatch("/:coinId/price");
//   const chartMatch = useMatch("/:coinId/chart");
 
    const { isLoading, data:infoData } = useQuery<IInfoData>({
            queryKey: ["info", idx],
            queryFn: ()=> fetchCoinInfo(idx!)
    });
    const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
        ["tickers", idx],
        () => fetchCoinTickers(idx!),
        {
        refetchInterval: 5000,
        }
    );

    useEffect(()=>{
        console.log(router.query.idx)
    },[])

    return(
        <>
            <Layout>
                <div id='coin'>
                    <div className="wrapper">
                        <div className="container">
                        {isLoading ? (
                            <div className="loading">Loading...</div>
                        ) : (
                            <div className="detail">
                                <div className="infos">
                                    <div className="info">
                                        <span>RANK:</span>
                                        <span>{infoData?.rank}</span>
                                    </div>
                                    <div className="info">
                                        <span>SYMBOL:</span>
                                        <span>{infoData?.symbol}</span>
                                    </div>
                                    <div className="info">
                                        <span>Price:</span>
                                        <span>$ {tickersData?.quotes.USD.price.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    )
}

export default Coin