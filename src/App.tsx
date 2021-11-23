import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCoinsByMarketCap } from "./store/coinList/actions";
import CoinList from "./components/CoinList/coinList";
import "./App.scss";

const App: FC = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCoinsByMarketCap());
   }, []);

   return (
      <div>
         <CoinList />
      </div>
   );
};

export default App;
