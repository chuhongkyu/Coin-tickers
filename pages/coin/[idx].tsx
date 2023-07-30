import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import AsyncBoundary from "components/AsyncBoundary"
import CoinList from "components/CoinList"
import Layout from "components/Layout"


const Coin = () => {
    return(
        <>
            <Layout>
            <AsyncBoundary
                errorFallback={<div>Error occurred while loading the coin data.</div>}
                loadingFallback={<div>Loading...</div>}
                >
                <div id='coin'>
                    <CoinList/>
                </div>
                </AsyncBoundary>
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    )
}

export default Coin