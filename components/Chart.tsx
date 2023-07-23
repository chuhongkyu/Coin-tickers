'use client'

import { useQuery } from "@tanstack/react-query"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "utils/atom";
import { fetchCoinHistory } from "utils/api";
import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";


interface ChartProps{
    coinId:string
}

interface IHistorical{
  time_open: string
  time_close: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  market_cap: number
}

interface IChart{
  name: string
  volumn: number
}

function Chart({coinId}: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom)
    const [chart, setChart] = useState<IChart[]>([
    {
      name: "string",
      volumn: 124,
    },{
      name: "string",
      volumn: 124,
    }
    ])

    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 1000,
        }
    );

    useEffect(()=>{
      setChart(
        [{
          name: "open",
          volumn: data[0]?.open,
        },
        {
          name: "low",
          volumn: data[0]?.low,
        },
        {
          name: "high",
          volumn: data[0]?.high,
        },
        ])
    },[data])

    return (
        <div className="chart">
            {isLoading? "Loading chart...": 
            <LineChart
              data={chart}
              width={390}
              height={300}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="volumn" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>  
            }
            
        </div>
    )
}

export default Chart;