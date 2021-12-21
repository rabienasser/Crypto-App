import { FC } from "react";
import { useSelector } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { RootState } from "store";
import { btc, eth } from "store/coinList/coinListReducer";
import { convertLargeNum } from "utils/numberConversions/convertLargeNum";
import "./globalDataBar.style.scss";

library.add(fab);

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
   const { globalData } = useSelector((state: RootState) => state.globalData);
   const btcImage = useSelector(btc);
   const ethImage = useSelector(eth);

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
                  <div className="dot"></div>$
                  <b>{convertLargeNum(globalData.total_market_cap.usd)}</b>
               </li>
               <li>
                  <div className="dot"></div>$
                  <b>{convertLargeNum(globalData.total_volume.usd)}</b>
               </li>
               <li>
                  <div className="coin-stats">
                     <img
                        className="icon"
                        src={btcImage?.image}
                        alt={btcImage?.name}
                     />
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
                     <img
                        className="icon"
                        src={ethImage?.image}
                        alt={ethImage?.name}
                     />
                     <p>
                        <b>
                           {globalData.market_cap_percentage.eth.toFixed(0)} %
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
