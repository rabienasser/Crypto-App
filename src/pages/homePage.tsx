import React, { FC, useEffect } from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
   getCoinsByMarketCap,
   getCoinsByVolume,
} from "../store/coinList/actions";
import CoinList from "../components/CoinList/coinList";

const HomePage: FC = () => {
   const { marketCap, top, page } = useSelector(
      (state: RootState) => state.coinList
   );
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCoinsByMarketCap(top));
   }, []);

   useEffect(() => {
      if (marketCap) {
         dispatch(getCoinsByMarketCap(top));
      } else {
         dispatch(getCoinsByVolume(top));
      }
   }, [top, page]);

   return (
      <div className="home-page">
         <div className="home-container">
            <div>d</div>
            <CoinList />
            <div>d</div>
         </div>
      </div>
   );
};

export default HomePage;
