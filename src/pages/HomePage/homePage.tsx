import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoinList, GlobalDataBar, Loading } from "components";
import { getCoinsByMarketCap, getCoinsByVolume } from "store/coinList/actions";
import { RootState } from "store";
import { getIsAppLoading } from "store/coinList/coinListReducer";
import { getGlobalData } from "store/globalData/actions";

const HomePage: FC = () => {
   const { marketCap, top, page } = useSelector(
      (state: RootState) => state.coinList
   );
   const isLoading = useSelector(getIsAppLoading);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCoinsByMarketCap(top));
      dispatch(getGlobalData());
   }, []);

   useEffect(() => {
      if (marketCap) {
         dispatch(getCoinsByMarketCap(top));
      } else {
         dispatch(getCoinsByVolume(top));
      }
   }, [top, page]);

   const homePageHeight = isLoading
      ? { height: "100vh" }
      : { height: "fit-content" };

   return (
      <div className="home-page">
         <div className="home-container" style={homePageHeight}>
            {isLoading && <Loading />}
            <GlobalDataBar />
            <CoinList />
         </div>
      </div>
   );
};

export default HomePage;
