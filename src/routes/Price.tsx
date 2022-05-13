import { useQuery } from "react-query";
import { fetchCoinTickers} from "./api";
import PriceChart from "react-apexcharts"
import styled from "styled-components";


const PriceDonut = styled.div`
    padding: 0px 5px;
    margin-top: 20px;
    h1{
        font-size: 25px;
        color: ${(props)=>props.theme.textColor};
    }
    p{
        font-size: 13px;
    }
`

interface PriceProps{
    coinId:string
}

interface ICoinTickers{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    circulating_supply: number,
    total_supply: number,
    max_supply: number,
    beta_value: number,
    first_data_at: string,
    last_updated: string,
    quotes: {
        USD:{
            ath_date: string
            ath_price: number
            market_cap: number
            market_cap_change_24h: number
            percent_change_1h: number
            percent_change_1y: number
            percent_change_6h: number
            percent_change_7d: number
            percent_change_12h: number
            percent_change_15m: number
            percent_change_24h: number
            percent_change_30d: number
            percent_change_30m: number
            percent_from_price_ath: number
            price: number
            volume_24h: number
            volume_24h_change_24h: number
            }
    }
}

function Price({coinId}: PriceProps) {
    const {isLoading, data} = useQuery<ICoinTickers>(["Price", coinId], ()=> fetchCoinTickers(coinId),
    {
        refetchInterval: 1000,
    }
    )
    console.log();
    return (
        <PriceDonut>
            <h1>{data?.id.toUpperCase()}</h1>
            <p>{"$:"+ data?.quotes.USD.price.toFixed(1)}</p>
            {isLoading? "Loading Pric chart...": 
            <PriceChart
                type="donut"
                series= {[
                    data?.circulating_supply as number,
                    data?.max_supply as number,
                    data?.total_supply as number,
                ]}
                options={
                    {
                        chart:{
                            height: 300,
                            width: 500,
                            background: "transparent",
                        },
                        labels: Object.keys(data!).slice(4,7),
                        colors: ["#3691f9", "#8be60d", "#ffd943"],
                    }       
                }
            />
            }
        </PriceDonut>
    )
    
}

export default Price;