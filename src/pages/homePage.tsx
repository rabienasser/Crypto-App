import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCoinsByMarketCap } from "../store/coinList/actions";
import CoinList from "../components/CoinList/coinList";

const HomePage: FC = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCoinsByMarketCap());
   }, []);

   return (
      <div className="home-page">
         <div className="home-container">
            <CoinList />
         </div>
      </div>
   );
};

export default HomePage;
