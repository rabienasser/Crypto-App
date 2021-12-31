import { FC } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { convertLargeNum } from "utils/numberConversions/convertLargeNum";
import { convertNumToPercent } from "utils/numberConversions/convertNumToPercent";
import { showCurrencySymbol } from "utils/showCurrencySymbol";
import "./progressBar.style.scss";

interface ProgressBarProps {
   num1: number;
   num2: number;
   idx: number;
}

const progressBarColors = {
   pair1: {
      color1: "#92a8d1",
      color2: "#034f84",
   },
   pair2: {
      color1: "#f7cac9",
      color2: "#f7786b",
   },
   pair3: {
      color1: "#FFB528",
      color2: "#FEE158",
   },
   pair4: {
      color1: "#1A6C55",
      color2: "#1BA27A",
   },
   pair5: {
      color1: "#98009D",
      color2: "#985D9D",
   },
   pair6: {
      color1: "#f1e3dd",
      color2: "#667292",
   },
   pair7: {
      color1: "#0b9494",
      color2: "#31d3d3",
   },
};

const ProgressBar: FC<ProgressBarProps> = ({ num1, num2, idx }) => {
   const { currency } = useSelector((state: RootState) => state.coinList);
   let progressPercent = num1 / num2;

   const generateColors = (idx: number) => {
      return Object.values(progressBarColors)[
         idx % Object.keys(progressBarColors).length
      ];
   };

   const largeNum1 = convertLargeNum(num1);
   const largeNum2 = convertLargeNum(num2);

   return (
      <div className="progress-bar-div">
         <div className="coin-stats">
            <p style={{ color: `${generateColors(idx).color1}` }}>
               {["Omitted", "∞"].indexOf(largeNum1) < 0
                  ? `${showCurrencySymbol(currency)}${largeNum1}`
                  : `${largeNum1}`}
            </p>
            <p style={{ color: `${generateColors(idx).color2}` }}>
               {["Omitted", "∞"].indexOf(largeNum2) < 0
                  ? `${showCurrencySymbol(currency)}${largeNum2}`
                  : `${largeNum2}`}
            </p>
         </div>
         <div
            className="progress-bar"
            style={{ background: `${generateColors(idx).color1}` }}
         >
            <div
               className="inner-bar"
               style={{
                  width: `${convertNumToPercent(progressPercent)}`,
                  background: `${generateColors(idx).color2}`,
               }}
            ></div>
         </div>
      </div>
   );
};

export default ProgressBar;
