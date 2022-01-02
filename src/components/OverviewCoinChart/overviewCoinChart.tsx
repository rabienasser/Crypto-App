import { FC } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Tooltip,
   Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Filler,
   Tooltip
);

const OverviewCoinChart: FC = () => {
   const { data } = useSelector((state: RootState) => state.overview);
   const prices = data?.prices?.map((arr: number[]) => arr[1]);

   const labels = prices?.map((_: any, idx: number) => idx + 1);

   const options = {
      responsive: true,
      scales: {
         xAxis: {
            grid: {
               display: false,
            },
         },
         yAxis: {
            display: false,
         },
      },
      elements: {
         line: {
            tension: 0.4,
            borderWidth: 3,
            borderColor: "#dbc473",
         },
         point: {
            radius: 0,
            hitRadius: 12,
            hoverRadius: 8,
         },
      },
   };

   const createCanvas = (canvas: any) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#888888");

      return {
         labels: labels,
         datasets: [
            {
               label: "Price",
               data: prices,
               backgroundColor: gradient,
               pointBackgroundColor: "#dbc473",
               fill: true,
            },
         ],
      };
   };

   const canvas = document.createElement("canvas");
   const coinData = createCanvas(canvas);

   return (
      <div>
         <Line data={coinData} options={options} />
      </div>
   );
};

export default OverviewCoinChart;
