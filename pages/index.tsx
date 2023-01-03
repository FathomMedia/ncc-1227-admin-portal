import { useRouter } from "next/router";
import LargeBarGraphInfo from "../components/graphs/large-bar-graph-info";
import LargeDonutGraphInfo from "../components/graphs/large-donut-graph-info";
import MiniGraphInfo from "../components/graphs/mini-graph-info";

import { PageComponent } from "../components/page-component";
import PrimaryButton from "../components/primary-button";
import SecondaryButton from "../components/secondary-button";
import { useStudent } from "../context/StudentContext";
import { Status } from "../src/API";

import _ from "lodash";
import {
  getMeGpaSummary,
  getMeWeeklySummary,
  giveMeApplicationsThisMonth,
  giveMeTopProgram,
  giveMeTopUniversities,
} from "../src/Helpers";

export default function Home() {
  const { push } = useRouter();
  const { applications } = useStudent();

  let sortedApplications = applications?.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  let applicationThisMonthGraph =
    giveMeApplicationsThisMonth(sortedApplications);

  let pendingApprovalGraph = sortedApplications?.filter(
    (element) =>
      element.status === Status.ELIGIBLE || element.status === Status.REVIEW
  );

  let listOfPrograms = sortedApplications
    ? sortedApplications
        ?.map((app) => app.programs?.items)
        .map((p) => p?.map((pc) => pc?.program))
        .flat()
    : [];

  let topUniversitiesGraph = giveMeTopUniversities(listOfPrograms, 4);
  let topProgramsGraph = giveMeTopProgram(listOfPrograms, 4);
  let gpaSummaryGraph = getMeGpaSummary(sortedApplications);
  let weeklySummaryGraph = getMeWeeklySummary(sortedApplications);

  return (
    <PageComponent title={"Home"}>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex justify-between ">
          {/*  */}
          <div className="flex flex-col ">
            <div className="mb-5 ">
              <div className="text-3xl font-semibold ">Application Summary</div>
              <div className="text-base font-medium text-gray-500 ">
                An overview of enrollment for current batch.
              </div>
            </div>
          </div>
          {/* TODO - dashboard buttons here  */}
          <div className="flex items-center justify-end h-10 gap-4 m-4">
            <PrimaryButton
              name={"All Applications"}
              buttonClick={() => push("/applications")}
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
        <div className="flex justify-between gap-8 mb-8 overflow-x-scroll">
          <MiniGraphInfo
            title={"Total applications"}
            graphNum={applications?.length ?? 0}
            graph={{
              labels: applications
                ? [
                    ...applications.map(
                      (app) => `${new Date(app.createdAt).getMonth()}`
                    ),
                  ]
                : [],
              datasets: [
                {
                  data: applications
                    ? [...applications.map((app) => app.gpa ?? 0)]
                    : [],
                },
              ],
            }}
          ></MiniGraphInfo>
          <MiniGraphInfo
            title={"Applicants this month"}
            graphNum={applicationThisMonthGraph?.length ?? 0}
            graph={{
              labels: applicationThisMonthGraph
                ? [
                    ...applicationThisMonthGraph.map(
                      (app) => `${new Date(app.createdAt).getDate()}`
                    ),
                  ]
                : [],
              datasets: [
                {
                  data: applicationThisMonthGraph
                    ? [
                        ...applicationThisMonthGraph.map((app) =>
                          new Date(app.createdAt).getDate()
                        ),
                      ]
                    : [],
                },
              ],
            }}
          ></MiniGraphInfo>
          <MiniGraphInfo
            title={"Pending approval"}
            graphNum={pendingApprovalGraph?.length ?? 0}
            graph={{
              labels: pendingApprovalGraph
                ? [...pendingApprovalGraph.map((app) => `${app.status}`)]
                : [],
              datasets: [
                {
                  data: pendingApprovalGraph
                    ? [...pendingApprovalGraph.map((app) => app.gpa ?? 0)]
                    : [],
                },
              ],
            }}
          ></MiniGraphInfo>
        </div>

        {/* reports and graphs */}
        <div>
          {/* title and sub buttons */}
          <div className="flex justify-between mb-5 ">
            <div className="flex flex-col ">
              <div className="text-3xl font-semibold ">Reports & Graphs</div>
              <div className="text-base font-medium text-gray-500 ">
                An overview of all data.
              </div>
            </div>
            <div className="flex items-center justify-end h-10 gap-4 m-4 ">
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
          <div className="grid items-center justify-center w-full h-full grid-cols-2 gap-x-8 gap-y-10">
            <LargeBarGraphInfo
              title={"Weekly Summary"}
              barLabel={"Applications"}
              subBarLabel={"Applications per day"}
              labels={weeklySummaryGraph.map((perDay) => perDay.dayName)}
              data={weeklySummaryGraph.map((perDay) => perDay.count)}
            ></LargeBarGraphInfo>
            <LargeDonutGraphInfo
              title={"Top Universities"}
              labels={topUniversitiesGraph.map((p) => p.name)}
              data={topUniversitiesGraph.map((p) => p.count)}
            ></LargeDonutGraphInfo>
            <LargeBarGraphInfo
              title={"GPA Summary"}
              barLabel={"GPA"}
              subBarLabel={"Mean of the applications"}
              min={70}
              max={100}
              labels={gpaSummaryGraph.map((perMonth) => perMonth.monthName)}
              data={gpaSummaryGraph.map((perMonth) => perMonth.meanGpa)}
            ></LargeBarGraphInfo>
            <LargeDonutGraphInfo
              title={"Top Programs"}
              labels={topProgramsGraph.map((p) => p.name)}
              data={topProgramsGraph.map((p) => p.count)}
            ></LargeDonutGraphInfo>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
