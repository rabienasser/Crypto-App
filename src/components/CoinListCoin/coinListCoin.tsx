import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { ProgressBar, CoinChart } from "components";
import { Coin } from "store/coinList/types";
import { RootState } from "store";
import { showCurrencySymbol } from "utils/currencyConversions/showCurrencySymbol";

interface CoinProps {
   coin: Coin;
   idx: number;
}

const CoinListCoin: FC<CoinProps> = ({ coin, idx }) => {
   const { currency } = useSelector((state: RootState) => state.coinList);
   return (
      <tr className="coin-list-coin">
         <td>{idx + 1}</td>
         <td className="coin-name">
            <div>
               <img className="coin-image" src={coin.image} alt={coin.name} />
               <Link to={`/coins/${coin.name}`}>
                  {coin.name} ({coin.symbol.toUpperCase()})
               </Link>
            </div>
         </td>
         <td>
            {showCurrencySymbol(currency)}
            {coin.current_price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
         </td>
         <td
            className={
               coin.price_change_percentage_1h_in_currency < 0
                  ? "neg-value"
                  : "pos-value"
            }
         >
            <div className="percent-change">
               <FontAwesomeIcon
                  className="caret"
                  icon={
                     coin.price_change_percentage_7d_in_currency < 0
                        ? faCaretDown
                        : faCaretUp
                  }
               />
               <p>{coin.price_change_percentage_1h_in_currency?.toFixed(2)}%</p>
            </div>
         </td>
         <td
            className={
               coin.price_change_percentage_24h_in_currency < 0
                  ? "neg-value"
                  : "pos-value"
            }
         >
            <div className="percent-change">
               <FontAwesomeIcon
                  className="caret"
                  icon={
                     coin.price_change_percentage_7d_in_currency < 0
                        ? faCaretDown
                        : faCaretUp
                  }
               />
               <p>
                  {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
               </p>
            </div>
         </td>
         <td
            className={
               coin.price_change_percentage_7d_in_currency < 0
                  ? "neg-value"
                  : "pos-value"
            }
         >
            <div className="percent-change">
               <FontAwesomeIcon
                  className="caret"
                  icon={
                     coin.price_change_percentage_7d_in_currency < 0
                        ? faCaretDown
                        : faCaretUp
                  }
               />
               <p>{coin.price_change_percentage_7d_in_currency?.toFixed(2)}%</p>
            </div>
         </td>
         <td>
            <ProgressBar
               num1={coin.total_volume}
               num2={coin.market_cap}
               idx={idx}
            />
         </td>
         <td>
            <ProgressBar
               num1={coin.circulating_supply}
               num2={coin.total_supply}
               idx={idx}
            />
         </td>
         <td>
            <CoinChart data={coin.sparkline_in_7d.price} />
         </td>
      </tr>
   );
};

export default CoinListCoin;
