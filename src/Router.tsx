import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path="/:coinId/*" element={<Coin/>}></Route>
            <Route path="/" element={<Coins/>}></Route>
        </Routes>
    </BrowserRouter>    
}

export default Router;