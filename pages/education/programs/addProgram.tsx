import React from "react";
import { PageComponent } from "../../../components/page-component";
import ProgramFormComponent from "../../../components/program-form-component";

export default function AddProgram() {
  return (
    <div>
      <PageComponent title={"AddProgram"}>
        <div>
          {/* title */}
          <div className="mb-8 ">
            <div className="text-2xl font-semibold ">Add Program</div>
            <div className="text-base font-medium text-gray-500 ">
              Add a new program to a specified university.
            </div>
          </div>
          {/* fields */}
          <ProgramFormComponent
            programName={""}
            universityID={undefined}
            availability={0}
            requirements={""}
            isDeactivated={false}
          ></ProgramFormComponent>
        </div>
      </PageComponent>
    </div>
  );
}
