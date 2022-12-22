import React from "react";
import { PageComponent } from "../components/page-component";
import TableComponent from "../components/table-component";
import { StudentsTableHeaders } from "../constants/table-headers";
import { useStudent } from "../context/StudentContext";

export default function Applications() {
  const students = useStudent();
  const studentTableHeader = StudentsTableHeaders;

  return (
    <PageComponent title={"Applications"}>
      <div>
        <h1>Applications</h1>
        <h2>View all student applications.</h2>
        {/* applications search bar */}
        <div></div>
        {/* applications table with pagination*/}
        <div>
          {/* <TableComponent
            headers={studentTableHeader}
            data={students.students?.listStudents?.items as any[]}
            // data={[]}
          ></TableComponent> */}
        </div>
      </div>
    </PageComponent>
  );
}
