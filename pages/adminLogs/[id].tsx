import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { PageComponent } from "../../components/page-component";
import { Toaster } from "react-hot-toast";
import { getAdminLogByID } from "../../src/CustomAPI";
import { AdminLog, Application } from "../../src/API";
import { useRouter } from "next/router";
import PrimaryButton from "../../components/primary-button";
import ViewApplication from "../../components/application-view-component";

interface Props {
  adminLog: AdminLog;
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  let adminLog = await getAdminLogByID(`${id}`);
  return {
    props: { adminLog: adminLog },
  };
};

export default function AdminLogHistoryInfo({ adminLog }: Props) {
  const router = useRouter();
  const { id } = router.query;

  const [snapshot, setSnapshot] = useState<Application | undefined>(undefined);

  useEffect(() => {
    if (adminLog.snapshot) {
      setSnapshot(JSON.parse(adminLog.snapshot) as Application);
    }

    return () => {};
  }, [adminLog.snapshot]);

  return (
    <PageComponent title={"AdminLogHistory"}>
      <Toaster />
      <div className=" flex flex-col justify-between p-4 ">
        <div className=" p-4 ">
          <div className=" mb-8 flex justify-between items-center ">
            <div>
              <div className=" text-2xl font-semibold">Log History</div>
              <div className=" text-base font-medium text-gray-500">{id}</div>
            </div>
            <PrimaryButton
              name={"Back"}
              buttonClick={() => {
                router.back();
              }}
            ></PrimaryButton>
          </div>
          {/* body */}
          <div className=" flex flex-col justify-between gap-4">
            <div>
              <div className=" text-xl font-semibold">Admin Information</div>
              <div>{adminLog.admin?.fullName}</div>
              <div>{adminLog.admin?.email}</div>
              <div>{adminLog.admin?.cpr}</div>
            </div>
            <div className=" ">
              <div className=" text-xl font-semibold">Application Details</div>
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
              <div className=" text-xl font-semibold">Reason for change</div>
              <div>{adminLog.reason}</div>
            </div>
            <div>
              <div className=" text-xl font-semibold">Updated at</div>
              <div>{`${Intl.DateTimeFormat("en", {
                timeStyle: "short",
                dateStyle: "medium",
              }).format(new Date(adminLog.updatedAt))}`}</div>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
