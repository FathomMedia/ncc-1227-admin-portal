import { useRouter } from "next/router";
import React, { FC } from "react";
import { Toaster } from "react-hot-toast";
import { PageComponent } from "../../components/page-component";
import { getApplicationByIdAPI } from "../../context/StudentContext";
import { GetServerSideProps } from "next";
import { Application } from "../../src/API";
import ViewApplication from "../../components/application-view-component";
import StudentInfoComponent from "../../components/student-info-component";
import ParentsInfoComponent from "../../components/parents-info-component";

interface Props {
  application: Application;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const res = await getApplicationByIdAPI(`${id}`);

  return {
    props: {
      application: res,
    },
  };
};

const ApplicationInfo: FC<Props> = (props) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <PageComponent title={"ApplicationInfo"}>
        <Toaster />
        <div className=" ">
          <div className=" text-2xl font-semibold">View Applications</div>
          <div className=" text-base font-medium text-gray-500">
            Application ID: {id}
          </div>
        </div>
        <ViewApplication
          application={props.application}
          downloadLinks={{
            cprDoc: props.application.attachment?.cprDoc,
            acceptanceLetterDoc:
              props.application.attachment?.acceptanceLetterDoc,
            transcriptDoc: props.application.attachment?.transcriptDoc,
            signedContractDoc: props.application.attachment?.signedContractDoc,
          }}
          readOnly={false}
        ></ViewApplication>

        <div className=" divider"></div>

        <div>
          <div className=" mt-10">
            <div className=" text-base font-medium text-gray-500">
              Student Information
            </div>
          </div>
          <StudentInfoComponent
            student={props.application.student}
          ></StudentInfoComponent>
        </div>

        <div className=" divider"></div>

        <div className=" mb-4">
          <div className=" mt-10">
            <div className=" text-base font-medium text-gray-500">
              Parents Information
            </div>
          </div>
          <ParentsInfoComponent
            parents={props.application.student?.ParentInfo}
          ></ParentsInfoComponent>
        </div>
      </PageComponent>
    </div>
  );
};

export default ApplicationInfo;
