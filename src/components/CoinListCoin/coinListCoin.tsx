import React, { FC } from "react";
import { ProgressBar } from "components";
import { Coin } from "store/coinList/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface CoinProps {
   coin: Coin;
   idx: number;
}

const CoinListCoin: FC<CoinProps> = ({ coin, idx }) => {
   return (
      <tr className="coin-list-coin">
         <td>{idx + 1}</td>
         <td className="coin-name">
            {" "}
            <img className="coin-image" src={coin.image} alt={coin.name} />{" "}
            <p>
               {coin.name} ({coin.symbol.toUpperCase()})
            </p>
         </td>
         <td>
            $
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
            <h1>GRAPH</h1>
         </td>
      </tr>
   );
};

export default CoinListCoin;
