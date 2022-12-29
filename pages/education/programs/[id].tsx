import React from "react";
import { PageComponent } from "../../../components/page-component";
import { GetServerSideProps } from "next";
import { getProgramById } from "../../../src/CustomAPI";
import { Program } from "../../../src/API";
import { Toaster } from "react-hot-toast";
import ProgramFormComponent from "../../../components/program-form-component";

interface Props {
  program: Program;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query; // your fetch function here

  let program = await getProgramById(`${id}`);

  return {
    props: { program: program },
  };
};
export default function ProgramInfo({ program }: Props) {
  return (
    <div>
      <PageComponent title={"ProgramInfo"}>
        <Toaster />
        <div className="mb-8 ">
          <div className="text-2xl font-semibold ">Program: {program.name}</div>
          <div className="text-base font-medium text-gray-500 ">
            Program ID: {program.id}
          </div>
        </div>
        <div>
          <ProgramFormComponent
            program={program}
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
