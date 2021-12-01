import React, { FC } from "react";
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
   let progressPercent = num1 / num2;

   const generateColors = (idx: number) => {
      return Object.values(progressBarColors)[
         idx % Object.keys(progressBarColors).length
      ];
   };

   const convertNum = (number: number | null): string => {
      let newValue: number | string | null = number;

      const suffixes = ["", "K", "M", "B", "T", "Q"];
      let suffixNum = 0;

      if (newValue !== null) {
         while (newValue >= 1000) {
            newValue /= 1000;
            suffixNum++;
         }

         newValue = newValue === 0 ? "Omitted" : newValue.toPrecision(3);

         newValue += suffixes[suffixNum];
      } else {
         newValue = "∞";
      }

      return newValue;
   };

   const convertNumToPercent = (num: number): string => {
      let progPercString: string = num.toString();
      if (
         progPercString === "1" ||
         progPercString === "Infinity" ||
         progPercString === "0" ||
         progPercString === "NaN"
      ) {
         progPercString = "100%";
      } else {
         progPercString = progPercString.split(".")[1].substr(0, 4);
         progPercString = parseInt(progPercString) / 100 + "%";
      }
      return progPercString;
   };

   return (
      <div className="progress-bar-div">
         <div className="coin-stats">
            <p style={{ color: `${generateColors(idx).color1}` }}>
               {["Omitted", "∞"].indexOf(convertNum(num1)) < 0
                  ? `$${convertNum(num1)}`
                  : `${convertNum(num1)}`}
            </p>
            <p style={{ color: `${generateColors(idx).color2}` }}>
               {["Omitted", "∞"].indexOf(convertNum(num2)) < 0
                  ? `$${convertNum(num2)}`
                  : `${convertNum(num2)}`}
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
