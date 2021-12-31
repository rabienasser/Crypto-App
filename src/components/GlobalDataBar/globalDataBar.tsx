import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { convertLargeNum } from "utils/numberConversions/convertLargeNum";
import { showCurrencySymbol } from "utils/showCurrencySymbol";
import { globalMarketCap, globalVolume } from "utils/globalDataCurrency";
import "./globalDataBar.style.scss";

interface ProgressBarProps {
   percent: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ percent }) => {
   return (
      <div className="progress-bar">
         <div className="inner-bar" style={{ width: `${percent}%` }}></div>
      </div>
   );
};

const GlobalDataBar: FC = () => {
   const { globalData, btc, eth } = useSelector(
      (state: RootState) => state.globalData
   );
   const { currency } = useSelector((state: RootState) => state.coinList);

   return (
      <div className="global-data">
         {globalData && (
            <ul>
               <li>
                  <p>Coins</p>
                  <b>{globalData.active_cryptocurrencies}</b>
               </li>
               <li>
                  <p>Exchanges</p>
                  <b>{globalData.markets}</b>
               </li>
               <li>
                  <div className="dot"></div>
                  {showCurrencySymbol(currency)}
                  <b>
                     {convertLargeNum(globalMarketCap(currency, globalData))}
                  </b>
               </li>
               <li>
                  <div className="dot"></div>
                  {showCurrencySymbol(currency)}
                  <b>{convertLargeNum(globalVolume(currency, globalData))}</b>
               </li>
               <li>
                  <div className="coin-stats">
                     <img className="icon" src={btc} alt="Bitcoin" />
                     <p>
                        <b>
                           {globalData.market_cap_percentage.btc.toFixed(0)}%
                        </b>
                     </p>
                  </div>
                  <ProgressBar
                     percent={globalData.market_cap_percentage.btc.toFixed(0)}
                  />
               </li>
               <li>
                  <div className="coin-stats">
                     <img className="icon" src={eth} alt="Ethereum" />
                     <p>
                        <b>
                           {globalData.market_cap_percentage.eth.toFixed(0)}%
                        </b>
                     </p>
                  </div>
                  <ProgressBar
                     percent={globalData.market_cap_percentage.eth.toFixed(0)}
                  />
               </li>
            </ul>
         )}
      </div>
   );
};

export default GlobalDataBar;
