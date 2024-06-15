import { hexToString } from "./hexToString";

export function reportsToArray(reports: any) {
  const reportsArray = [];
  for (const report in reports) {
    console.log(reports[report]);
    reportsArray.push("oie", hexToString(reports[report].payload));
  }
  console.log(reportsArray);
  return reportsArray;
}