import { FC, useEffect, useState } from "react";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
   changeDays,
   getOverviewChartData,
   changeCoin,
} from "store/overview/actions";
import { OverviewCoinChart } from "components";
import { searchCoins } from "store/searchCoins/actions";
import { showCurrencySymbol } from "utils/showCurrencySymbol";
import "./overview.style.scss";

const Overview: FC = () => {
   const [chartInput, setChartInput] = useState(false);
   const [chartInputValue, setChartInputValue] = useState("");
   const [isSearchList, setSearchList] = useState(false);

   const { prices, days, id } = useSelector(
      (state: RootState) => state.overview
   );
   const { coins } = useSelector((state: RootState) => state.searchCoins);
   const { currency } = useSelector((state: RootState) => state.coinList);

   const dispatch = useDispatch();

   const dispatchSearchCoins = () => {
      dispatch(searchCoins(chartInputValue));
   };

   const selectChartCurrency = () => {
      switch (currency) {
         case "usd":
            return prices?.usd;
         case "gbp":
            return prices?.gbp;
         case "eur":
            return prices?.eur;
         default:
            return prices?.jpy;
      }
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

   const chartPrice = selectChartCurrency()
      ?.toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

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
               <div className="line-chart">
                  <OverviewCoinChart />
               </div>
            </div>
         </div>
         <div className="chart-settings">
            <ul>
               <button
                  className={days === 7 ? "selected-button" : ""}
                  onClick={() => dispatch(changeDays(7))}
               >
                  1w
               </button>
               <button
                  className={days === 30 ? "selected-button" : ""}
                  onClick={() => dispatch(changeDays(30))}
               >
                  1m
               </button>
               <button
                  className={days === 90 ? "selected-button" : ""}
                  onClick={() => dispatch(changeDays(90))}
               >
                  3m
               </button>
               <button
                  className={days === 180 ? "selected-button" : ""}
                  onClick={() => dispatch(changeDays(180))}
               >
                  6m
               </button>
               <button
                  className={days === 365 ? "selected-button" : ""}
                  onClick={() => dispatch(changeDays(365))}
               >
                  1y
               </button>
            </ul>
         </div>
      </div>
   );
};

export default Overview;
