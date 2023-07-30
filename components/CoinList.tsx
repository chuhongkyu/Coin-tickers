
import { useRouter } from "next/router"
import { useEffect } from "react"
import { fetchCoinInfo, fetchCoinTickers } from "utils/api"
import { IInfoData, IPriceData } from "utils/interface"
import { useQuery } from "@tanstack/react-query"
import Chart from "components/Chart"

const CoinList = () => {
    const router = useRouter()
    const { idx } = router.query as { idx: string };
    const { data:infoData } = useQuery<IInfoData>({
            queryKey: ["info", idx],
            queryFn: ()=> fetchCoinInfo(idx!)
    });
    const { data: tickersData } = useQuery<IPriceData>(
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
        <div className="wrapper">
            <div className="container">
                <div className="detail">
                    <h1>{infoData?.name}</h1>
                    <div className="infos">
                        <div className="info">
                            <span>RANK :</span>
                            <span>{infoData?.rank}</span>
                        </div>
                        <div className="info">
                            <span>SYMBOL :</span>
                            <span>{infoData?.symbol}</span>
                        </div>
                        <div className="info">
                            <span>Price :</span>
                            <span>$ {tickersData?.quotes.USD.price.toFixed(1)}</span>
                        </div>
                    </div>
                    <div className="infos __supply">
                        <div className="info">
                            <span>TOTAL :</span>
                            <span>{tickersData?.total_supply}</span>
                        </div>
                        <div className="info">
                            <span>MAX :</span>
                            <span>{tickersData?.max_supply}</span>
                        </div>
                    </div>
                    <div className="description">
                        <h5>Description:</h5>
                        {infoData ? infoData?.description?.length >= 100 ? infoData?.description : infoData?.description.substring(0, 100) + "..." : null}
                    </div>
                    
                    <Chart coinId={idx}/>
                </div>
            </div>
        </div>
    )
}

export default CoinList;