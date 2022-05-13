import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { DarkMode } from "../atoms";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

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

const CoinsListDiv = styled.div`
    width: 100%;
    height: 80vh;
    overflow-y: hidden;
`

const CoinsList = styled.ul`
    width: 100%;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
`

const Coin =styled.li`
    background-color: ${props => props.theme.contentColor};
    color: ${props => props.theme.textColor};
    font-weight: 800;
    box-shadow: ${props => props.theme.boxShadow};
    padding: 0px 10px;
    border-radius: 15px;
    margin-bottom: 15px;
    a{
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in-out;
    }
    &:hover{
        box-shadow: ${props => props.theme.clickedStyle};
        a{
            color: ${props=>props.theme.accentColor}
        }
    }
`

const Title = styled.h1`
    font-size: 30px;
    font-weight: 800;
    color: ${props=>props.theme.textColor};
`

const HandleThemeBtn = styled.div<{isClick: boolean}>`
    width: 80px;
    padding: 5px 10px;
    border-radius: 25px;
    box-shadow:${props => props.theme.clickedStyle};
    display: flex;
    justify-content: ${props => props.isClick? "flex-end":"flex-start"};
    align-items: center;
    span{
        font-size: 15px;
        color: ${props=>props.theme.cloudColor};
        background-color: ${props=>props.theme.contentColor};
        padding: 5px 10px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.5s;
        box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.25),
                    -2px -2px 3px 0 rgba(255, 255, 255, 0.3);
        &:hover{
            background-color: ${props=>props.theme.accentColor};
            transition: 0.5s;
        }
    }
`

const Loader = styled.span`
    text-align: center;
    display: block;
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

interface ICoin{
        "id": string,
        "name": string,
        "symbol": string,
        "rank": number,
        "is_new": boolean,
        "is_active": boolean,
        "type": string
}

function Coins() {
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)
    const setDarkAtom = useSetRecoilState(DarkMode);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const [click, setClick ] = useState(false);
    return (
    <Container>
        <Helmet>
            <title>코인</title>
        </Helmet>
        <Header>
            <Title>Cloud Coin</Title>
            <HandleThemeBtn isClick={click} onClick={()=> {
                    setClick(!click)}}>
                <span onClick={toggleDarkAtom}>☁︎</span>
            </HandleThemeBtn>
        </Header>
        {isLoading ? <Loader>Loading...</Loader> :
            <CoinsListDiv>
                <CoinsList>
                    {data?.slice(0,100).map((coin)=>
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={coin.name}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>)
                    }
                </CoinsList>
            </CoinsListDiv>}
    </Container>)
    
}

export default Coins;