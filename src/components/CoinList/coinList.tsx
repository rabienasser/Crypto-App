import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import { Coin } from "../../store/coinList/types";
import {
   getCoinsByMarketCap,
   getCoinsByVolume,
   sortPrice,
   sortName,
} from "../../store/coinList/actions";
import CoinListCoin from "../CoinListCoin/coinListCoin";

const CoinList: FC = () => {
   const { data, isLoading, marketCap } = useSelector(
      (state: RootState) => state.coinList
   );

   const dispatch = useDispatch();

   return (
      <div className="coin-list">
         {isLoading && <h1>Loading...</h1>}
         <button onClick={() => dispatch(sortName())}>Name</button>
         <button onClick={() => dispatch(sortPrice())}>Price</button>
         <button
            onClick={
               marketCap
                  ? () => dispatch(getCoinsByVolume())
                  : () => dispatch(getCoinsByMarketCap())
            }
         >
            {marketCap ? "Market Cap" : "Volume"}
         </button>
         {data?.map((coin: Coin) => (
            <CoinListCoin key={coin.id} coin={coin} data={data} />
         ))}
      </div>
   );
};

export default CoinList;
