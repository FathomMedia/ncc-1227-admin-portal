import LargeBarGraphInfo from "../components/large-bar-graph-info";
import LargeDonutGraphInfo from "../components/large-donut-graph-info";
import MiniGraphInfo from "../components/mini-graph-info";

import { PageComponent } from "../components/page-component";
import PrimaryButton from "../components/primary-button";
import SecondaryButton from "../components/secondary-button";

export default function Home() {
  return (
    <PageComponent title={"Home"}>
      <div className=" flex flex-col justify-between gap-4">
        <div className="flex justify-between ">
          {/*  */}
          <div className=" flex flex-col">
            <div className=" mb-5">
              <div className=" text-3xl font-semibold">Application Summary</div>
              <div className=" text-base text-gray-500 font-medium">
                An overview of enrollment for current batch.
              </div>
            </div>
          </div>
          {/* TODO - dashboard buttons here  */}
          <div className="flex gap-4 h-10 m-4 justify-end items-center">
            <PrimaryButton
              name={"All Applications"}
              buttonClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></PrimaryButton>
            <SecondaryButton
              name={"Export CSV"}
              buttonClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></SecondaryButton>
          </div>
        </div>

        {/* mini graphs */}
        <div className=" mb-8 flex justify-between gap-8">
          <MiniGraphInfo
            title={"Total applications"}
            graphNum={102}
            graph={"graph"}
          ></MiniGraphInfo>
          <MiniGraphInfo
            title={"Applicants this month"}
            graphNum={865}
            graph={"graph"}
          ></MiniGraphInfo>
          <MiniGraphInfo
            title={"Pending approval"}
            graphNum={93}
            graph={"graph"}
          ></MiniGraphInfo>
        </div>

        {/* reports and graphs */}
        <div>
          {/* title and sub buttons */}
          <div className=" mb-5 flex justify-between">
            <div className=" flex flex-col">
              <div className=" text-3xl font-semibold">Reports & Graphs</div>
              <div className=" text-base text-gray-500 font-medium">
                An overview of all data.
              </div>
            </div>
            <div className=" flex gap-4 h-10 m-4 justify-end items-center">
              <PrimaryButton
                name={"Apply"}
                buttonClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              ></PrimaryButton>
              <SecondaryButton
                name={"Export CSV"}
                buttonClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              ></SecondaryButton>
            </div>
          </div>
          {/* large graphs */}
          <div className=" w-full h-full grid grid-cols-2 gap-x-8 gap-y-10 justify-center items-center">
            <LargeBarGraphInfo title={"Weekly Summary"}></LargeBarGraphInfo>
            <LargeDonutGraphInfo
              title={"Top Universities"}
            ></LargeDonutGraphInfo>
            <LargeBarGraphInfo title={"GPA Summary"}></LargeBarGraphInfo>
            <LargeDonutGraphInfo title={"Top Programs"}></LargeDonutGraphInfo>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
