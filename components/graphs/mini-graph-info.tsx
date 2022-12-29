import { ChartData } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

interface Props {
  title: string;
  graphNum: number;
  graph: ChartData<"line", number[], string>;
}

export default function MiniGraphInfo({ title, graphNum, graph }: Props) {
  //! TODO - sample data pull actual data from db
  const data = graph;

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: "rgb(207, 159, 35)",
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full border rounded-xl border-anzac-50 bg-anzac-50 p-7">
      <div className="flex flex-col ">
        <div className="text-xs font-semibold text-gray-600 ">{title}</div>
        <div className="flex justify-between p-4 ">
          <div className="w-8 text-2xl ">{graphNum}</div>
          <Line data={data} width={100} height={40} options={options} />
        </div>
      </div>
    </div>
  );
}
