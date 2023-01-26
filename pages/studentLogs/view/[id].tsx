import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { PageComponent } from "../../../components/page-component";
import { Toaster } from "react-hot-toast";
import { AdminLog, Application, StudentLog } from "../../../src/API";
import { useRouter } from "next/router";
import PrimaryButton from "../../../components/primary-button";
import ViewApplication from "../../../components/application-view-component";
import { getStudentLogsByLogID } from "../../../src/CustomAPI";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

interface Props {
  studentLog: StudentLog;
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const { locale } = ctx;

  let studentLog = await getStudentLogsByLogID(`${id}`);
  return {
    props: {
      studentLog: studentLog,
      ...(await serverSideTranslations(locale ?? "en", [
        "pageTitles",
        "signIn",
        "studentLog",
        "applicationLog",
        "applications",
      ])),
    },
  };
};

const StudentLogHistoryInfo = ({ studentLog }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation("studentLog");

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
              <div className="text-2xl font-semibold ">{t("logHistory")}</div>
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
              <div className="text-xl font-semibold ">
                {t("studentInformation")}
              </div>
              <div>{studentLog.student?.fullName}</div>
              <div>{studentLog.student?.email}</div>
              <div>{studentLog.student?.phone}</div>
              <div>{studentLog.student?.cpr}</div>
            </div>
            <div className="">
              <div className="text-xl font-semibold ">
                {t("applicationDetails")}
              </div>
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
              <div className="text-xl font-semibold ">
                {t("reasonForChange")}
              </div>
              <div>{studentLog.reason}</div>
            </div>
            <div>
              <div className="text-xl font-semibold ">{t("updatedAt")}</div>
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
};

export default StudentLogHistoryInfo;
