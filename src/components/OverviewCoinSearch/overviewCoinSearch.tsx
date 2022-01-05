import { FC, useState, useEffect } from "react";
import { debounce } from "lodash";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { searchCoins } from "store/searchCoins/actions";
import { changeCoin } from "store/overview/actions";
import "./overviewCoinSearch.style.scss";

interface OverviewCoinSearchProps {
   id: string;
}

const OverviewCoinSearch: FC<OverviewCoinSearchProps> = ({ id }) => {
   const [chartInput, setChartInput] = useState(false);
   const [chartInputValue, setChartInputValue] = useState("");
   const [isSearchList, setSearchList] = useState(false);

   const { coins } = useSelector((state: RootState) => state.searchCoins);

   const dispatch = useDispatch();

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChartInputValue(e.target.value);
      if (chartInputValue !== "") {
         debounce(dispatchSearchCoins)();
      }
   };

   const dispatchSearchCoins = () => {
      dispatch(searchCoins(chartInputValue));
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

   const chartInputList = coins?.slice(0, 3);

   useEffect(() => {
      if (chartInputValue === "") {
         setSearchList(false);
      } else {
         setSearchList(true);
      }
   }, [chartInputValue]);

   return (
      <div className="coin-showing">
         <div className="showing">
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
                              onClick={(e) => handleSearchListClick(e, coin.id)}
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
   );
};

export default OverviewCoinSearch;
