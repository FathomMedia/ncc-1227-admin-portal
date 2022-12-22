import React from "react";
import { Doughnut } from "react-chartjs-2";
import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-button";

interface Props {
  title: string;
}
export default function LargeDonutGraphInfo({ title }: Props) {
  const data = {
    labels: ["1", "2", "3", "4"],
    datasets: [
      {
        borderColor: [
          "rgb(240, 226, 152)",
          "rgb(225, 185, 61)",
          "rgb(201, 233, 201)",
          "rgb(255, 176, 163)",
        ],
        data: [300, 50, 100, 300],
        backgroundColor: [
          "rgb(240, 226, 152)",
          "rgb(225, 185, 61)",
          "rgb(201, 233, 201)",
          "rgb(255, 176, 163)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full h-72 p-4 border rounded-xl bg-nccGray-50 flex flex-col justify-between">
      <div className=" flex justify-between justify-items-center items-center">
        {title}
        <PrimaryButton
          name={"Export CSV"}
          buttonClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        ></PrimaryButton>
      </div>
      <div className=" flex justify-center items-center">
        <Doughnut
          data={data}
          options={{
            maintainAspectRatio: false,
            elements: {
              arc: {
                borderWidth: 3,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
