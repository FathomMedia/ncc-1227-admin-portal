import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { PageComponent } from "../../../components/page-component";
import { Toaster } from "react-hot-toast";
import { AdminLog, Application, StudentLog } from "../../../src/API";
import { useRouter } from "next/router";
import PrimaryButton from "../../../components/primary-button";
import ViewApplication from "../../../components/application-view-component";
import { getStudentLogsByLogID } from "../../../src/CustomAPI";

interface Props {
  studentLog: StudentLog;
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  let studentLog = await getStudentLogsByLogID(`${id}`);
  return {
    props: { studentLog: studentLog },
  };
};

export default function StudentLogHistoryInfo({ studentLog }: Props) {
  const router = useRouter();
  const { id } = router.query;

  const [snapshot, setSnapshot] = useState<Application | undefined>(undefined);

  useEffect(() => {
    if (studentLog.snapshot) {
      setSnapshot(JSON.parse(studentLog.snapshot) as Application);
    }

    return () => {};
  }, [studentLog.snapshot]);

  return (
    <PageComponent title={"StudentLogHistory"}>
      <Toaster />
      <div className="flex flex-col justify-between p-4 ">
        <div className="p-4 ">
          <div className="flex items-center justify-between mb-8 ">
            <div>
              <div className="text-2xl font-semibold ">Log History</div>
              <div className="text-base font-medium text-gray-500 ">{id}</div>
            </div>
            <PrimaryButton
              name={"Back"}
              buttonClick={() => {
                router.back();
              }}
            ></PrimaryButton>
          </div>
          {/* body */}
          <div className="flex flex-col justify-between gap-4 ">
            <div>
              <div className="text-xl font-semibold ">Student Information</div>
              <div>{studentLog.student?.fullName}</div>
              <div>{studentLog.student?.email}</div>
              <div>{studentLog.student?.phone}</div>
              <div>{studentLog.student?.cpr}</div>
            </div>
            <div className="">
              <div className="text-xl font-semibold ">Application Details</div>
              {snapshot && (
                <ViewApplication
                  application={snapshot}
                  downloadLinks={{
                    cprDoc: snapshot.attachment?.cprDoc,
                    acceptanceLetterDoc:
                      snapshot.attachment?.acceptanceLetterDoc,
                    transcriptDoc: snapshot.attachment?.transcriptDoc,
                    signedContractDoc: snapshot.attachment?.signedContractDoc,
                  }}
                  readOnly={true}
                ></ViewApplication>
              )}
            </div>
            <div>
              <div className="text-xl font-semibold ">Reason for change</div>
              <div>{studentLog.reason}</div>
            </div>
            <div>
              <div className="text-xl font-semibold ">Updated at</div>
              <div>{`${Intl.DateTimeFormat("en", {
                timeStyle: "short",
                dateStyle: "medium",
              }).format(new Date(studentLog.updatedAt))}`}</div>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
