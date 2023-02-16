import { Formik, FormikHelpers, FormikValues } from "formik";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useTranslation } from "react-i18next";
import ManualReportFormComponent from "../../components/manual-report-component";
import { PageComponent } from "../../components/page-component";
import { getUniversityByID } from "../../src/CustomAPI";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "manualReport",
        "pageTitles",
        "signIn",
      ])),
    },
  };
};

function ManualReports() {
  const { t } = useTranslation("manualReport");
  return (
    <PageComponent title={"ManualReports"}>
      <div className="">
        <div className=" flex justify-between mb-8">
          <div className="text-2xl font-semibold ">
            {t("manualReportTitle")}
          </div>
        </div>
        <ManualReportFormComponent></ManualReportFormComponent>
      </div>
    </PageComponent>
  );
}

export default ManualReports;
