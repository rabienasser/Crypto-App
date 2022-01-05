import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeDays } from "store/overview/actions";
import "./overviewChartSettings.style.scss";

interface OverChartSettingsProps {
   days: number;
}

const OverviewChartSettings: FC<OverChartSettingsProps> = ({ days }) => {
   const dispatch = useDispatch();

   return (
      <div className="chart-settings">
         <ul>
            <button
               className={days === 7 ? "selected-button" : ""}
               onClick={() => dispatch(changeDays(7))}
            >
               1w
            </button>
            <button
               className={days === 30 ? "selected-button" : ""}
               onClick={() => dispatch(changeDays(30))}
            >
               1m
            </button>
            <button
               className={days === 90 ? "selected-button" : ""}
               onClick={() => dispatch(changeDays(90))}
            >
               3m
            </button>
            <button
               className={days === 180 ? "selected-button" : ""}
               onClick={() => dispatch(changeDays(180))}
            >
               6m
            </button>
            <button
               className={days === 365 ? "selected-button" : ""}
               onClick={() => dispatch(changeDays(365))}
            >
               1y
            </button>
         </ul>
      </div>
   );
};

export default OverviewChartSettings;
