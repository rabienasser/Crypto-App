import React, { FC, useState, useEffect } from "react";
import { RootState } from "store/index";
import { Coin } from "store/coinList/types";
import {
   getCoinsByMarketCap,
   setBottomOrTopCoins,
   getCoinsByVolume,
   sortPrice,
   sortName,
   sort1Hour,
   sort24Hour,
   sort7Day,
   changePage,
   changePerPage,
} from "store/coinList/actions";
import { CoinListCoin, Loading } from "components";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faSort,
   faFilter,
   faCaretRight,
   faCaretLeft,
   faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import "./coinList.style.scss";

const CoinList: FC = () => {
   const { data, isLoading, marketCap, top, page, perPage } = useSelector(
      (state: RootState) => state.coinList
   );

   const dispatch = useDispatch();

   const [dropDown, setDropDown] = useState(false);

   useEffect(() => {
      marketCap
         ? dispatch(getCoinsByMarketCap(top))
         : dispatch(getCoinsByVolume(top));
      setDropDown(false);
   }, [perPage]);

   return (
      <div className="coin-list">
         <div className="table-details">
            <div className="split">
               <div className="adjust-chart">
                  <button
                     onClick={() => dispatch(setBottomOrTopCoins())}
                     className="filter-btn"
                  >
                     <FontAwesomeIcon icon={faSort} />
                  </button>
                  <h1>
                     {top ? "TOP" : "BOT"} {perPage}
                  </h1>
               </div>
               <div className="adjust-chart">
                  <h3>BY {marketCap ? "MARKET CAP" : "VOLUME"}</h3>
                  <button
                     className="filter-btn"
                     onClick={
                        marketCap
                           ? () => dispatch(getCoinsByVolume(top))
                           : () => dispatch(getCoinsByMarketCap(top))
                     }
                  >
                     <FontAwesomeIcon icon={faCaretDown} />
                  </button>
               </div>
            </div>
            <div className="split">
               <div className="adjust-chart show-coins">
                  <h3>SHOW: {perPage}</h3>
                  <button
                     className="filter-btn"
                     onClick={() => setDropDown(!dropDown)}
                  >
                     <FontAwesomeIcon icon={faCaretDown} />
                  </button>
                  {dropDown && (
                     <ul className="drop-down">
                        <li onClick={() => dispatch(changePerPage(10))}>10</li>
                        <li onClick={() => dispatch(changePerPage(20))}>20</li>
                        <li onClick={() => dispatch(changePerPage(50))}>50</li>
                        <li onClick={() => dispatch(changePerPage(100))}>
                           100
                        </li>
                     </ul>
                  )}
               </div>
               <div className="adjust-chart">
                  <h3>PAGE</h3>
                  <div className="page-btn-div">
                     <button
                        className="filter-btn"
                        onClick={() => dispatch(changePage(false))}
                     >
                        <FontAwesomeIcon icon={faCaretLeft} />
                     </button>
                     <h3>{page}</h3>
                     <button
                        onClick={() => dispatch(changePage(true))}
                        className="filter-btn"
                     >
                        <FontAwesomeIcon icon={faCaretRight} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <table>
            <thead>
               <tr>
                  <th>#</th>
                  <th>
                     Name{" "}
                     <button
                        className="filter-btn"
                        onClick={() => dispatch(sortName())}
                     >
                        <FontAwesomeIcon icon={faFilter} />
                     </button>
                  </th>
                  <th>
                     Price{" "}
                     <button
                        className="filter-btn"
                        onClick={() => dispatch(sortPrice())}
                     >
                        <FontAwesomeIcon icon={faFilter} />
                     </button>
                  </th>
                  <th>
                     1h{" "}
                     <button
                        className="filter-btn"
                        onClick={() => dispatch(sort1Hour())}
                     >
                        <FontAwesomeIcon icon={faFilter} />
                     </button>
                  </th>
                  <th>
                     24h{" "}
                     <button
                        className="filter-btn"
                        onClick={() => dispatch(sort24Hour())}
                     >
                        <FontAwesomeIcon icon={faFilter} />
                     </button>
                  </th>
                  <th>
                     7d{" "}
                     <button
                        className="filter-btn"
                        onClick={() => dispatch(sort7Day())}
                     >
                        <FontAwesomeIcon icon={faFilter} />
                     </button>
                  </th>
                  <th>24h Vol / Market Cap</th>
                  <th>Circulating / Total Sup</th>
                  <th>Last 7d</th>
               </tr>
            </thead>
            <tbody>
               {data?.map((coin: Coin, idx) => (
                  <CoinListCoin key={coin.id} coin={coin} idx={idx} />
               ))}
            </tbody>
         </table>
         {isLoading && <Loading />}
      </div>
   );
};

export default CoinList;
