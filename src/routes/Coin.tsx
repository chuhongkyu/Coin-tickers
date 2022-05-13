import { useParams } from "react-router";
import { Link, useLocation, Routes, Route, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import {Helmet} from "react-helmet";
import { DarkMode } from "../atoms";
import { useSetRecoilState } from "recoil";

const Container = styled.div`
    padding: 10px 15px;
    width: 400px;
    height: 98vh;
    border-radius: 35px;
    border: 10px solid ${props => props.theme.borderColor};
    background-color: ${props => props.theme.contentColor};
    box-shadow: 
    12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
    margin-top: 10px;
`

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 5px;
`

const CircleBtn = styled.span`
    font-size: 15px;
    color: ${props=>props.theme.cloudColor};
    padding: 10px 13px;
    border-radius: 50%;
    box-shadow: ${props => props.theme.boxShadow};
    cursor: pointer;
    &:hover{
        box-shadow: ${props => props.theme.clickedStyle};
    }
`


const Title = styled.h1`
    font-size: 38px;
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
    box-shadow: 
    6px 6px 8px 0 rgba(0, 0, 0, 0.25),
    -4px -4px 6px 0 rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    padding: 10px 20px;
    margin-top: 15px;
    margin-bottom: 15px;
`

const CoinInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 25px;
    span:first-child{
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
        color: ${props=>props.theme.cloudColor};
    }
`

const CoinTabs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CoinTab = styled.span<{isActive: boolean}>`
    width: 100%;
    border: 5px solid white;
    border-radius: 25px;
    padding: 10px;
    box-shadow: ${props => props.isActive ? props.theme.clickedStyle : props.theme.boxShadow};
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props=>props.theme.contentColor};
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
    font-weight: 600;
    &:hover{
        box-shadow: ${props => props.theme.clickedStyle};
    }
`

const CoinDescript = styled.div`
    width: 100%;
    border-radius: 25px;
    padding: 10px 15px;
    color: ${props=>props.theme.cloudColor};
    box-shadow: 
    6px 6px 8px 0 rgba(0, 0, 0, 0.25),
    -4px -4px 6px 0 rgba(255, 255, 255, 0.3);   
    margin-bottom: 20px;
    h5{
        color: ${props=>props.theme.textColor};
        font-weight: 800;
        margin-bottom: 5px;
    }
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
    const navigate = useNavigate();
    const setDarkAtom = useSetRecoilState(DarkMode);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

    const {isLoading: infoLoading, data: infoData} =useQuery<IInfoData>(["info", coinId] ,()=> fetchCoinInfo(coinId!))
    const {isLoading: tickersLoading, data: tickersData} =useQuery<IPriceData>(["tickers", coinId] ,()=> fetchCoinTickers(coinId!),
    {
        refetchInterval: 5000,
    })
    
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>{state? state: loading? "Loading...": infoData?.name}</title>
            </Helmet>
        <Header>
            <CircleBtn onClick={()=> navigate("/")}>{"<"}</CircleBtn>
                <Title>{state? state: loading? "Loading...": infoData?.name}</Title>
            <CircleBtn onClick={toggleDarkAtom}>☁︎</CircleBtn>
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
                    <span>Price:</span>
                    <span>$ {tickersData?.quotes.USD.price.toFixed(1)}</span>
                </CoinInfo>
            </CoinInfos>

            <CoinDescript>
                <h5>Description:</h5>
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
                <Route path="price" element={<Price coinId={coinId!}/>}/>
                <Route path="chart" element={<Chart coinId={coinId!}/>}/>
            </Routes>
            
        </CoinDetail>
        
        }


        </Container>
    )

}

export default Coin;