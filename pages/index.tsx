import { useRouter } from "next/router";

import MiniGraphInfo, {
  GraphColor,
} from "../components/graphs/mini-graph-info";
import { LargeBarGraphInfo } from "../components/graphs/large-bar-graph-info";

import { PageComponent } from "../components/page-component";
import PrimaryButton from "../components/primary-button";
import { useStudent } from "../context/StudentContext";
import { Status } from "../src/API";

import _ from "lodash";

import { CSVLink } from "react-csv";

import {
  getMeGpaSummary,
  getMeWeeklySummary,
  giveMeApplicationsThisMonth,
  giveMeTopProgram,
  giveMeTopUniversities,
} from "../src/Helpers";
import { LargeDonutGraphInfo } from "../components/graphs/large-donut-graph-info";
import { DateRangeComponent } from "../components/date-range-component";

export default function Home() {
  const { push } = useRouter();
  const { applications, dateRange, updateDateRange } = useStudent();

  let sortedApplications = applications?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  let applicationThisMonthGraph =
    giveMeApplicationsThisMonth(sortedApplications);

  let pendingApprovalGraph = sortedApplications?.filter(
    (element) =>
      element.status === Status.ELIGIBLE ||
      element.status === Status.REVIEW ||
      element.status === Status.NOT_COMPLETED
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
        <div className="flex flex-wrap justify-between ">
          {/*  */}
          <div className="flex flex-col ">
            <div className="mb-5 ">
              <div className="text-3xl font-semibold ">
                {new Date(dateRange.start).getFullYear()} Applications Summary
              </div>
              <div className="text-base font-medium text-gray-500 ">
                An overview of enrollment for current batch.
              </div>
            </div>
          </div>
          {/* TODO - dashboard buttons here  */}
          <div className="flex flex-wrap items-center justify-end gap-4 m-4">
            <DateRangeComponent
              dateRange={dateRange}
              updateRange={updateDateRange}
            ></DateRangeComponent>
            <PrimaryButton
              name={"All Applications"}
              buttonClick={() => push("/applications")}
            ></PrimaryButton>

            <CSVLink
              filename={`${new Date().getFullYear()}-Applications-Summary-${new Date().toISOString()}.csv`}
              data={
                sortedApplications
                  ? [
                      ...sortedApplications.map((app, index) => {
                        let sortedProgramChoices = app.programs?.items?.sort(
                          (a, b) =>
                            (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                        );

                        return {
                          row: index + 1,
                          applicationId: app.id,
                          gpa: app.gpa,
                          status: app.status,
                          studentCPR: app.studentCPR,
                          dateTime: app.dateTime,
                          primaryProgramID:
                            sortedProgramChoices?.[0]?.program?.id,
                          primaryProgram: `${sortedProgramChoices?.[0]?.program?.name}-${sortedProgramChoices?.[0]?.program?.university?.name}`,
                          secondaryProgramID:
                            sortedProgramChoices?.[1]?.program?.id,
                          secondaryProgram: `${sortedProgramChoices?.[1]?.program?.name}-${sortedProgramChoices?.[1]?.program?.university?.name}`,
                        };
                      }),
                    ]
                  : []
              }
              className="text-xs hover:!text-white btn btn-primary btn-sm btn-outline"
            >
              Export CSV
            </CSVLink>
          </div>
        </div>

        {/* mini graphs */}
        <div className="flex justify-between gap-8 mb-8 overflow-x-scroll min-h-fit">
          <MiniGraphInfo
            color={GraphColor.YELLOW}
            title={"Total applications"}
            graphNum={applications?.length ?? 0}
            graph={{
              labels: gpaSummaryGraph
                ? [...gpaSummaryGraph.map((perMonth) => perMonth.monthName)]
                : [],
              datasets: [
                {
                  data: gpaSummaryGraph
                    ? [...gpaSummaryGraph.map((perMonth) => perMonth.meanGpa)]
                    : [],
                },
              ],
            }}
          ></MiniGraphInfo>
          <MiniGraphInfo
            color={GraphColor.RED}
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
            color={GraphColor.GREEN}
            title={"Pending applications"}
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
            <div className="flex items-center justify-end h-10 gap-4 m-4 "></div>
          </div>
          {/* large graphs */}
          <div className="grid items-center justify-center w-full h-full grid-cols-2 gap-x-8 gap-y-10 [grid-auto-rows:1fr]">
            <LargeBarGraphInfo
              title={"Weekly Summary"}
              barLabel={"Applications"}
              subBarLabel={"Applications last 7 days"}
              labels={weeklySummaryGraph.map((perDay) => perDay.dayName)}
              data={weeklySummaryGraph.map((perDay) => perDay.count)}
            >
              <CSVLink
                filename={`Weekly-Summary-${new Date().toISOString()}.csv`}
                data={
                  weeklySummaryGraph
                    ? [
                        ...weeklySummaryGraph.map((perDay) => {
                          return {
                            dayOfWeek: perDay.dayName,
                            numberOfApplications: perDay.count,
                          };
                        }),
                      ]
                    : []
                }
                className="text-xs text-white btn btn-primary btn-sm"
              >
                Export CSV
              </CSVLink>
            </LargeBarGraphInfo>
            <LargeDonutGraphInfo
              title={"Top Universities"}
              labels={topUniversitiesGraph.map((p) => p.name)}
              data={topUniversitiesGraph.map((p) => p.count)}
            >
              <CSVLink
                filename={`Top-Universities-${new Date().toISOString()}.csv`}
                data={
                  topUniversitiesGraph
                    ? [
                        ...topUniversitiesGraph.map((p) => {
                          return {
                            university: p.name,
                            numberOfApplications: p.count,
                          };
                        }),
                      ]
                    : []
                }
                className="text-xs text-white btn btn-primary btn-sm"
              >
                Export CSV
              </CSVLink>
            </LargeDonutGraphInfo>
            <LargeBarGraphInfo
              title={"GPA Summary"}
              barLabel={"GPA"}
              subBarLabel={"Mean of the applications"}
              min={70}
              max={100}
              labels={gpaSummaryGraph.map((perMonth) => perMonth.monthName)}
              data={gpaSummaryGraph.map((perMonth) => perMonth.meanGpa)}
            >
              <CSVLink
                filename={`GPA-Summary-${new Date().toISOString()}.csv`}
                data={
                  gpaSummaryGraph
                    ? [
                        ...gpaSummaryGraph.map((perMonth) => {
                          return {
                            month: perMonth.monthName,
                            meanGpa: perMonth.meanGpa,
                          };
                        }),
                      ]
                    : []
                }
                className="text-xs text-white btn btn-primary btn-sm"
              >
                Export CSV
              </CSVLink>
            </LargeBarGraphInfo>
            <LargeDonutGraphInfo
              title={"Top Programs"}
              labels={topProgramsGraph.map((p) => p.name)}
              data={topProgramsGraph.map((p) => p.count)}
            >
              <CSVLink
                filename={`Top-Programs-${new Date().toISOString()}.csv`}
                data={
                  topProgramsGraph
                    ? [
                        ...topProgramsGraph.map((p) => {
                          return {
                            program: p.name,
                            numberOfApplications: p.count,
                          };
                        }),
                      ]
                    : []
                }
                className="text-xs text-white btn btn-primary btn-sm"
              >
                Export CSV
              </CSVLink>
            </LargeDonutGraphInfo>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
