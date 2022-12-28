import React from "react";
import { Student } from "../src/API";

interface Props {
  student: Student | null | undefined;
}

//View student info - student name, cpr and email address
export default function StudentInfoComponent({ student }: Props) {
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
            <td>Full Name</td>
            <td>{student?.fullName}</td>
          </tr>
          <tr>
            <td>CPR</td>
            <td>{student?.cpr}</td>
          </tr>
          <tr>
            <td>Email Address</td>
            <td>{student?.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{student?.phone}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{student?.address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
