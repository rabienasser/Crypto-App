import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoinList, GlobalDataBar, Overview } from "components";
import { getCoinsByMarketCap, getCoinsByVolume } from "store/coinList/actions";
import { RootState } from "store";
import { getIsAppLoading } from "store/coinList/coinListReducer";
import { getGlobalData } from "store/globalData/actions";
import { getOverviewChartData } from "store/overview/actions";

const HomePage: FC = () => {
   const { marketCap, top, page } = useSelector(
      (state: RootState) => state.coinList
   );

   const dispatch = useDispatch();
   const isLoading = useSelector(getIsAppLoading);

   useEffect(() => {
      dispatch(getCoinsByMarketCap(top));
      dispatch(getGlobalData());
      dispatch(getOverviewChartData());
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
         <div className={`${isLoading && "home-page-loading"} home-container`}>
            <GlobalDataBar />
            <Overview />
            <CoinList />
         </div>
      </div>
   );
};

export default HomePage;
