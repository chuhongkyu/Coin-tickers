import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { useState } from 'react';
import { lightTheme, darkTheme } from '../theme';

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

const CircleBtn = styled.span`
    font-size: 15px;
    color: ${props=>props.theme.cloudColor};
    padding: 10px 13px;
    border-radius: 50%;
    box-shadow: 
    6px 6px 8px 0 rgba(0, 0, 0, 0.25),
    -4px -4px 6px 0 rgba(255, 255, 255, 0.3);
`

const DarkModeBtn = styled.span<{isDarkMode: boolean}>`
    width: 100px;
    border-radius: 25px;
    display: flex;
    justify-content: ${(props) => props.isDarkMode ? "flex-end" :"flex-start"};
    padding: 5px 7px;
    box-shadow: ${props => props.theme.clickedStyle};
    button{
        font-size: 15px;
        color: ${props=>props.theme.cloudColor};
        padding: 5px 8px;
        border-radius: 50%;
        box-shadow: ${props => props.theme.boxShadow};
        border-style: none;
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

    return (
    <Container>
        <Helmet>
                <title>코인</title>
        </Helmet>
        <Header>
            <Title>Cloud Coin</Title>
            <DarkModeBtn isDarkMode={false}>
               <button>☁︎</button> 
            </DarkModeBtn>
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