import React, { FC } from "react";
import { useSelector } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { RootState } from "store";
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
                  <div>
                     <FontAwesomeIcon
                        className="icon btc"
                        icon={["fab", "btc"]}
                     />
                     <b>{globalData.market_cap_percentage.btc.toFixed(0)}</b>%
                  </div>
                  <ProgressBar
                     percent={globalData.market_cap_percentage.btc.toFixed(0)}
                  />
               </li>
               <li>
                  <div>
                     <FontAwesomeIcon
                        className="icon eth"
                        icon={["fab", "ethereum"]}
                     />
                     <b>{globalData.market_cap_percentage.eth.toFixed(0)}</b>%
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
