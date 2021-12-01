import React, { FC, useEffect } from "react";
import { CoinList } from "components";
import { getCoinsByMarketCap, getCoinsByVolume } from "store/coinList/actions";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";

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
            <CoinList />
         </div>
      </div>
   );
};

export default HomePage;
