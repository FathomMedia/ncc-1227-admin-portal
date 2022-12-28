import React from "react";
import { ParentInfo } from "../src/API";

interface Props {
  parents: ParentInfo | null | undefined;
}
export default function ParentsInfoComponent({ parents }: Props) {
  return (
    <div>
      <table className="table w-full mb-4 table-fixed">
        <thead>
          <tr>
            <th>Student Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Father Name</td>
            <td>{parents?.fatherFullName}</td>
          </tr>
          <tr>
            <td>Father CPR</td>
            <td>{parents?.fatherCPR}</td>
          </tr>
          <tr>
            <td>Mother Name</td>
            <td>{parents?.motherFullName}</td>
          </tr>
          <tr>
            <td>Mother CPR</td>
            <td>{parents?.motherCPR}</td>
          </tr>
          <tr>
            <td>Guardian Name</td>
            <td>{parents?.guardianFullName}</td>
          </tr>
          <tr>
            <td>Guardian CPR</td>
            <td>{parents?.guardianCPR}</td>
          </tr>
          <tr>
            <td>Guardian Relation</td>
            <td>{parents?.relation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
