import { useQuery } from "@tanstack/react-query"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "utils/atom";
import { fetchCoinHistory } from "utils/api";
import ReactApexChart from "react-apexcharts";

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

function Chart({coinId}: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom)

    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 1000,
        }
    );

    return (
        <div className="chart">
            {isLoading? "Loading chart...": 
                <ReactApexChart
                    type="candlestick"
                    series={[
                        {
                            name: "price",
                            data: data?.map((price)=> [
                                new Date(price.time_open).getTime(),
                                price.open,
                                price.high,
                                price.low,
                                price.close,
                            ]) as any
                        },
                    ]} 
                    options={{
                        theme:{
                            mode: isDark ? "dark" : "light"
                        },
                        plotOptions: {
                            candlestick: {
                            colors: {
                                upward: '#3C90EB',
                                downward: '#df4646'
                            }
                            }
                        },
                        chart:{
                            height: 300,
                            width: 500,
                            toolbar:{
                                show: false,
                            },
                            background: "transparent",
                        },
                        stroke:{
                            curve: "smooth",
                            width: 3,
                        },
                        grid: {
                            show: false,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisTicks:{show: true},
                            labels: {show: false},
                            type: "datetime",
                            categories: data?.map((price)=> price.time_close)
                        },
                        tooltip:{
                            y:{
                                formatter: (value:any)=> `$ ${value.toFixed(3)}`
                            }
                        }
                    }}
                />
            }
        </div>
    )
}

export default Chart;