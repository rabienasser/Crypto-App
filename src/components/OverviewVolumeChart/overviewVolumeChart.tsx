import { FC } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Filler
);

const OverviewVolumeChart: FC = () => {
   const { data } = useSelector((state: RootState) => state.overview);

   const dates = data?.total_volumes.map((arr: number[]) =>
      new Date(arr[0]).toLocaleDateString("en-US", {
         day: "numeric",
         month: "numeric",
      })
   );
   const volumes = data?.total_volumes?.map((arr: number[]) => arr[1]);

   const labels = dates;

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
   };

   const createCanvas = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx!.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#e4c34f");

      return {
         labels: labels,
         datasets: [
            {
               label: "Volume",
               data: volumes,
               backgroundColor: gradient,
               hoverBackgroundColor: "#dbc473",
               hoverBorderRadius: 10,
            },
         ],
      };
   };

   const canvas = document.createElement("canvas");
   canvas.style.margin = "0";
   const coinData = createCanvas(canvas);

   return (
      <div>
         <Bar data={coinData} options={options} />
      </div>
   );
};

export default OverviewVolumeChart;
