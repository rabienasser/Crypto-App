import { FC, useEffect, useState } from "react";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { getOverviewChartData, changeCoin } from "store/overview/actions";
import {
   OverviewCoinChart,
   OverviewVolumeChart,
   OverviewChartSettings,
} from "components";
import { searchCoins } from "store/searchCoins/actions";
import { showCurrencySymbol } from "utils/currencyConversions/showCurrencySymbol";
import { selectChartCurrency } from "utils/currencyConversions/selectOverviewChartCurrency";
import { convertLargeNum } from "utils/numberConversions/convertLargeNum";
import "./overview.style.scss";

const Overview: FC = () => {
   const [chartInput, setChartInput] = useState(false);
   const [chartInputValue, setChartInputValue] = useState("");
   const [isSearchList, setSearchList] = useState(false);

   const { marketData, days, id } = useSelector(
      (state: RootState) => state.overview
   );
   const { coins } = useSelector((state: RootState) => state.searchCoins);
   const { currency } = useSelector((state: RootState) => state.coinList);

   const dispatch = useDispatch();

   const dispatchSearchCoins = () => {
      dispatch(searchCoins(chartInputValue));
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChartInputValue(e.target.value);
      if (chartInputValue !== "") {
         debounce(dispatchSearchCoins)();
      }
   };

   const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(changeCoin(chartInputValue));
      setChartInputValue("");
   };

   const handleSearchListClick = (
      e: React.MouseEvent<HTMLLIElement>,
      coin: string
   ) => {
      dispatch(changeCoin(coin));
      setChartInputValue("");
   };

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

   const chartInputList = coins?.slice(0, 3);

   useEffect(() => {
      if (chartInputValue === "") {
         setSearchList(false);
      } else {
         setSearchList(true);
      }
   }, [chartInputValue]);

   useEffect(() => {
      dispatch(getOverviewChartData());
   }, [days, id]);

   return (
      <div className="overview">
         <h1>Overivew</h1>
         <div className="charts">
            <div className="chart">
               <div className="chart-details">
                  <div className="coin-specifics">
                     <p>Price</p>
                     <p className="price">
                        {showCurrencySymbol(currency)}
                        {chartPrice}
                     </p>
                     <p>{chartDate}</p>
                  </div>
                  <div className="coin-showing">
                     <div>
                        <p>Showing:</p>
                        <span>
                           <p>{id.toUpperCase()}</p>
                           <FontAwesomeIcon
                              className="icon"
                              icon={faCaretDown}
                              onClick={() => setChartInput(!chartInput)}
                           />
                        </span>
                     </div>
                     <div className="search-bar">
                        {chartInput && (
                           <form onSubmit={handleInputSubmit}>
                              <input
                                 type="text"
                                 placeholder="Search Coin..."
                                 onChange={handleInputChange}
                                 value={chartInputValue}
                              />
                              {isSearchList && (
                                 <ul>
                                    {chartInputList?.map((coin) => (
                                       <li
                                          onClick={(e) =>
                                             handleSearchListClick(e, coin.id)
                                          }
                                          key={coin.name}
                                       >
                                          {coin.name}
                                       </li>
                                    ))}
                                 </ul>
                              )}
                           </form>
                        )}
                     </div>
                  </div>
               </div>

               <div className="line-chart">
                  <OverviewCoinChart />
               </div>
            </div>
            <div className="chart">
               <div className="chart-details">
                  <div className="coin-specifics">
                     <p>Volume 24hr</p>
                     <p className="price">
                        {showCurrencySymbol(currency)}
                        {chartVolume}
                     </p>
                     <p>{chartDate}</p>
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
