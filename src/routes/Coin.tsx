import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useLocation, Routes, Route, useMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "./api";

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
    color: ${props=>props.theme.textColor};
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

const CoinTabs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CoinTab = styled.span<{isActive: boolean}>`
    width: 100%;
    height: 80px;
    border-radius: 25px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props=>props.theme.contentColor};
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
`

const CoinDescript = styled.p`
    text-align: center; 
    margin-bottom: 20px;
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
    const {coinId} = useParams();
    const {state}= useLocation()as RouterState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    const {isLoading: infoLoading, data: infoData} =useQuery<IInfoData>(["info", coinId] ,()=> fetchCoinInfo(coinId!))
    const {isLoading: tickersLoading, data: tickersData} =useQuery<IPriceData>(["tickers", coinId] ,()=> fetchCoinTickers(coinId!))
    
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
        <Header>
            <Title>{state? state: loading? "Loading...": infoData?.name}</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> : 
        <CoinDetail>
            <CoinInfos>
                <CoinInfo>
                    <span>RANK:</span>
                    <span>{infoData?.rank}</span>
                </CoinInfo>
                <CoinInfo>
                    <span>SYMBOL:</span>
                    <span>{infoData?.symbol}</span>
                </CoinInfo>
                <CoinInfo>
                    <span>OPEN SOURCE:</span>
                    <span>{infoData?.open_source? "YES":"NO"}</span>
                </CoinInfo>
            </CoinInfos>

            <CoinDescript>
                {infoData?.description}
            </CoinDescript>
            <CoinInfos>
                <CoinInfo>
                    <span>TOTAL SUPPLY:</span>
                    <span>{tickersData?.total_supply}</span>
                </CoinInfo>
                <CoinInfo>
                    <span>MAX SUPPLY:</span>
                    <span>{tickersData?.max_supply}</span>
                </CoinInfo>
            </CoinInfos>

            <CoinTabs>
                <CoinTab isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/chart`}>Chart</Link>
                </CoinTab>
                <CoinTab isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/price`}>Price</Link>
                </CoinTab>
            </CoinTabs>

            <Routes>
                <Route path="price" element={<Price/>}/>
                <Route path="chart" element={<Chart coinId={coinId!}/>}/>
            </Routes>
            
        </CoinDetail>
        
        }


        </Container>
    )

}

export default Coin;