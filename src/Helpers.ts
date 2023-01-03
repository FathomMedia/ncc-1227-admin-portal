import _ from "lodash";
import { Application, Program } from "./API";

export interface TopGraphData {
  id: string;
  name: string;
  count: number;
}

export function giveMeTopUniversities(
  programs: (Program | null | undefined)[],
  top?: number
): TopGraphData[] {
  let topUniversitiesGraph: TopGraphData[] = [];

  let idWithCount = _.countBy(programs, (program) => program?.university?.id);

  _.forEach(idWithCount, function (value, key) {
    let tempTop: TopGraphData = {
      id: key,
      name:
        programs.find((p) => p?.university?.id === key)?.university?.name ??
        "Null",
      count: value,
    };

    topUniversitiesGraph.push(tempTop);
  });
  return topUniversitiesGraph
    .sort((a, b) => b.count - a.count)
    .splice(0, top ?? 5);
}

export function giveMeTopProgram(
  programs: (Program | null | undefined)[],
  top?: number
): TopGraphData[] {
  let topProgramsGraph: TopGraphData[] = [];

  let idWithCount = _.countBy(programs, (program) => program?.id);

  _.forEach(idWithCount, function (value, key) {
    let program = programs.find((p) => p?.id === key);

    let tempTop: TopGraphData = {
      id: key,
      name: `${program?.name} - ${program?.university?.name}`,
      count: value,
    };

    topProgramsGraph.push(tempTop);
  });
  return topProgramsGraph.sort((a, b) => b.count - a.count).splice(0, top ?? 5);
}

export function giveMeApplicationsThisMonth(
  applications: Application[] | undefined
) {
  return applications?.filter((app) => {
    const orderDate = new Date(app.createdAt);
    const today = new Date();
    const isThisYear = orderDate.getFullYear() === today.getFullYear();
    const isThisMonth = orderDate.getMonth() === today.getMonth();

    return isThisYear && isThisMonth;
  });
}

export interface GpaSummaryGraphData {
  monthName: string;
  meanGpa: number;
}

export interface WeeklySummaryGraphData {
  dayName: string;
  count: number;
}

export function getApplicationsByMonth(
  applications: Application[] | undefined
) {
  return _.groupBy(applications, (app) => {
    let createdAt = new Date(app.createdAt);
    return createdAt.getMonth();
  });
}

export function getMeGpaSummary(applications: Application[] | undefined) {
  let applicationsPerMonth = getApplicationsByMonth(applications);

  let gpaSummaryData: GpaSummaryGraphData[] = [];

  _.forEach(applicationsPerMonth, (value, key) => {
    let data = {
      monthName: monthNames[Number(key)],
      meanGpa: _.meanBy(value, (app) => app.gpa),
    };
    gpaSummaryData.push(data);
  });

  return gpaSummaryData;
}

export function getMeWeeklySummary(applications: Application[] | undefined) {
  let applicationsThisWeek = applications?.filter((app) => {
    let d = new Date();

    d.setDate(d.getDate() - 7);

    return new Date(app.createdAt) > d && new Date(app.createdAt) <= new Date();
  });

  let weeklySummaryData: WeeklySummaryGraphData[] = [];

  let applicationsPerDay = _.groupBy(applicationsThisWeek, (app) => {
    return new Date(app.createdAt).getDay();
  });

  _.forEach(applicationsPerDay, (value, key) => {
    let data: WeeklySummaryGraphData = {
      dayName: daysOfWeekNames[Number(key)],
      count: value.length,
    };
    weeklySummaryData.push(data);
  });

  return weeklySummaryData;
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const daysOfWeekNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
