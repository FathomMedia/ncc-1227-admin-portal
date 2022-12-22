import React from "react";
import { Bar } from "react-chartjs-2";
import PrimaryButton from "./primary-button";

interface Props {
  title: string;
}

export default function LargeBarGraphInfo({ title }: Props) {
  //! TODO sample data - remove and apply actual data from db
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Aug"],
    datasets: [
      {
        label: "Brutto",
        borderRadius: 30,
        data: [1, 0.4, 0.2, 0.3, 0.7, 0.8, 0.6],
        barThickness: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        borderSkipped: "start",
        label: {
          boxWidth: 7,
          usePointStyle: true,
          pointStyle: "circle",
        },
        title: {
          text: "Some text",
          display: true,
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        max: 1,
      },
    },
    barPercentage: 0.3,
    categoryPercentage: 1,
  };

  return (
    <div className=" w-full h-72 p-4 border rounded-xl bg-nccGray-50 flex flex-col justify-between">
      <div className=" flex justify-between justify-items-center items-center">
        {title}
        <PrimaryButton
          name={"Export CSV"}
          buttonClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        ></PrimaryButton>
      </div>
      <div className="flex justify-center items-center">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
