import { FC, useEffect } from "react";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { getIsAppLoading } from "store/coinList/coinListReducer";
import { getOverviewChartData } from "store/overview/actions";
import {
   OverviewCoinChart,
   OverviewVolumeChart,
   OverviewChartSettings,
   OverviewCoinSearch,
   Loading,
} from "components";
import { showCurrencySymbol } from "utils/currencyConversions/showCurrencySymbol";
import { selectChartCurrency } from "utils/currencyConversions/selectOverviewChartCurrency";
import { convertLargeNum } from "utils/numberConversions/convertLargeNum";
import useWindowSize from "hooks/useWindowSize";
import "./overview.style.scss";

const Overview: FC = () => {
   const { marketData, days, id } = useSelector(
      (state: RootState) => state.overview
   );
   const { currency } = useSelector((state: RootState) => state.coinList);

   const dispatch = useDispatch();
   const isLoading = useSelector(getIsAppLoading);
   const size = useWindowSize();

   const chartPrice = selectChartCurrency(marketData, currency, false)
      ?.toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

   let chartVolume = selectChartCurrency(marketData, currency, true);
   chartVolume = convertLargeNum(chartVolume!);

   const chartDate = new Date().toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
   });

   useEffect(() => {
      dispatch(getOverviewChartData());
   }, [days, id]);

   return (
      <div className="overview">
         <div className="overview-header">
            <h1>Overivew</h1>
            <OverviewCoinSearch id={id} />
         </div>

         <div className="charts">
            <div className="chart price-chart">
               {isLoading && <Loading />}
               <div className="chart-details">
                  <div className="coin-specifics">
                     <p>Price</p>
                     <p className="price">
                        {showCurrencySymbol(currency)}
                        {chartPrice}
                     </p>
                     {size.width! > 400 && <p>{chartDate}</p>}
                  </div>
               </div>

               <div className="line-chart">
                  <OverviewCoinChart />
               </div>
            </div>

            <div className="chart">
               {isLoading && <Loading />}
               <div className="chart-details">
                  <div className="coin-specifics">
                     <p>Volume 24hr</p>
                     <p className="price">
                        {showCurrencySymbol(currency)}
                        {chartVolume}
                     </p>
                     {size.width! > 400 && <p>{chartDate}</p>}
                  </div>
               </div>
               <div className="line-chart">
                  <OverviewVolumeChart />
               </div>
            </div>
         </div>
         <OverviewChartSettings days={days} />
      </div>
   );
};

export default Overview;
