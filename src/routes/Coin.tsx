import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {Routes, Route} from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";

const Container = styled.div`
    padding: 0px 20px;
    width: 500px;
`

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`

const Title = styled.h1`
    font-size: 48px;
    color: ${props=>props.theme.accentColor};
`

const Loader = styled.span`
    text-align: center;
    display: block;
`

const CoinDetail = styled.div`
`

const CoinInfos = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props=>props.theme.contentColor};
    border-radius: 25px;
    padding: 10px 20px;
    margin-bottom: 15px;
`
const CoinInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span:first-child{
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`

const CoinDescript = styled.p`
    text-align: center;    
`

interface RouterState{
    state:string;
}

interface ITag{
    coin_counter: number
    ico_counter: number
    id: string
    name: string
}

interface IInfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: ITag[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
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
    } ;
}


function Coin({}) {
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams();
    const {state}= useLocation()as RouterState;
    const [info, setInfo] = useState<IInfoData>();
    const [priceInfo, setPriceInfo] = useState<IPriceData>();
    useEffect(()=>{
        (async ()=>{
            const infoData = await( await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
            // console.log(infoData);
            // console.log(priceData)
        })();
    }, [coinId]);
    console.log(state);
    return (
        <Container>
        <Header>
            <Title>{state? state: loading? "Loading...": info?.name}</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> : 
        <CoinDetail>
            <CoinInfos>
                <CoinInfo>
                    <span>RANK:</span>
                    <span>{info?.rank}</span>
                </CoinInfo>
                <CoinInfo>
                    <span>SYMBOL:</span>
                    <span>{info?.symbol}</span>
                </CoinInfo>
                <CoinInfo>
                    <span>OPEN SOURCE:</span>
                    <span>{info?.open_source? "YES":"NO"}</span>
                </CoinInfo>
            </CoinInfos>

            <CoinDescript>
                {info?.description}
            </CoinDescript>
            <CoinInfos>
                <CoinInfo>
                    <span>TOTAL SUPPLY:</span>
                    <span>{priceInfo?.total_supply}</span>
                </CoinInfo>
                <CoinInfo>
                    <span>MAX SUPPLY:</span>
                    <span>{priceInfo?.max_supply}</span>
                </CoinInfo>
            </CoinInfos>

            <Link to={`/${coinId}/chart`}>
                Chart
            </Link>
            <Link to={`/${coinId}/price`}>
                Price
            </Link>

            <Routes>
                <Route path="price" element={<Price/>}/>
                <Route path="chart" element={<Chart/>}/>
            </Routes>
            
        </CoinDetail>
        
        }


        </Container>
    )

}

export default Coin;