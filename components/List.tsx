'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ICoin } from 'utils/interface'

interface IProp{
    coin: ICoin
}

const List = (props:IProp) => {
    const {coin} = props;

    return(
        <li>
           <Link 
                href={{
                    pathname: `/${coin.id}`,
                    query: coin.name,
                    }} >
                <Image 
                    width={40} 
                    height={40}
                    alt={coin.id}
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    />
                <h5>{coin.name}</h5>
           </Link>
        </li>
    )
}

export default List