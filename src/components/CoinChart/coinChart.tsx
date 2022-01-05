import { FC } from "react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useWindowSize from "hooks/useWindowSize";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Tooltip
);

interface CoinChartProps {
   data: number[];
}

const CoinChart: FC<CoinChartProps> = ({ data }) => {
   const size = useWindowSize();

   const increasing = data[data.length - 1] - data[0] > 0;
   const labels = data.map((dataPoint) => "");

   const chartStyle = {
      height: "100%",
      width: size.width! > 900 ? "8rem" : "6rem",
      margin: "auto",
   };

   const options = {
      scales: {
         xAxis: {
            display: false,
         },
         yAxis: {
            display: false,
         },
      },
   };

   const coinData = {
      labels: labels,
      datasets: [
         {
            data: data,
            borderColor: increasing ? "#06d921" : "#fe1040",
            pointRadius: 0,
            borderWidth: 2,
         },
      ],
   };

   return (
      <div style={chartStyle}>
         <Line data={coinData} options={options} />
      </div>
   );
};

export default CoinChart;
