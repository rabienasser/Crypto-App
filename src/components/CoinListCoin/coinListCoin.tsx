import React, { FC } from "react";
import { Coin, CoinList } from "../../store/coinList/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface CoinProps {
   coin: Coin;
   data: CoinList;
   idx: number;
}

const CoinListCoin: FC<CoinProps> = ({ coin, data, idx }) => {
   const rank = data.indexOf(coin);

   const convertNum = (number: number): string => {
      let newValue: number | string = number;
      const suffixes = ["", "K", "M", "B", "T"];
      let suffixNum = 0;
      while (newValue >= 1000) {
         newValue /= 1000;
         suffixNum++;
      }

      newValue = newValue.toPrecision(3);

      newValue += suffixes[suffixNum];
      return newValue;
   };

   return (
      // <div className="coin-list-coin">
      //    <p>{rank + 1}</p>
      //    <img
      //       src={coin.image}
      //       alt={coin.name}
      //       style={{ width: "50px", height: "50px" }}
      //    />
      //    <p>{coin.name}</p>
      //    <p>{coin.symbol}</p>
      //    <p>
      //       ${coin.current_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      //    </p>
      //    <p>{coin.price_change_percentage_1h_in_currency?.toFixed(2)}%</p>
      //    <p>{coin.price_change_percentage_24h_in_currency?.toFixed(2)}%</p>
      //    <p>{coin.price_change_percentage_7d_in_currency?.toFixed(2)}%</p>
      //    <p>
      //       24h Vol:${convertNum(coin.total_volume)} / Market Cap:{" "}
      //       {coin.market_cap}
      //    </p>
      //    <p>
      //       Circulating:{coin.circulating_supply} / Total Supply:{" "}
      //       {coin.total_supply}
      //    </p>
      // </div>
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
      </tr>
   );
};

export default CoinListCoin;
