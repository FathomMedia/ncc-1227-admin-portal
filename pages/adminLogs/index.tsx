import React, { FC, useEffect, useState } from "react";
import { PageComponent } from "../../components/page-component";
import { listAllAdminsLogs } from "../../src/CustomAPI";
import { AdminLog } from "../../src/API";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

interface Props {
  adminsLogs: AdminLog[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const res = await listAllAdminsLogs();

  return {
    props: {
      adminsLogs: res,
      ...(await serverSideTranslations(locale ?? "en", [
        "adminLog",
        "pageTitles",
        "signIn",
      ])),
    },
  };
};

const AdminLogs: FC<Props> = ({ adminsLogs }) => {
  const { t } = useTranslation("adminLog");
  const { push } = useRouter();

  return (
    <PageComponent title={"Admin Logs"}>
      <Toaster />
      <div className="mb-8 ">
        <div className="text-2xl font-semibold ">{t("adminLogTitle")}</div>
        <div className="text-base font-medium text-gray-500 ">
          {t("adminLogSubtitle")}
        </div>
      </div>
      {adminsLogs.length > 0 ? (
        <table dir="ltr" className="table w-full ">
          <thead className="border rounded-xl border-nccGray-100">
            <tr>
              <th>{t("tableAdminLogName")}</th>
              <th>{t("tableAdminLogCPR")}</th>
              <th>{t("tableAdminLogDate")}</th>
              <th>{t("tableAdminLogHistory")}</th>
            </tr>
          </thead>
          <tbody>
            {adminsLogs
              .sort(
                (a, b) =>
                  new Date(`${b.dateTime}`).getTime() -
                  new Date(`${a.dateTime}`).getTime()
              )
              .map((log) => (
                <tr key={log.id}>
                  <td>{log.admin?.fullName}</td>
                  <td>{log.adminCPR}</td>
                  <td>{`${Intl.DateTimeFormat("en", {
                    timeStyle: "short",
                    dateStyle: "medium",
                  }).format(new Date(`${log.dateTime}`))}`}</td>
                  <td>
                    <Link
                      className=" link link-primary"
                      href={""}
                      onClick={() => {
                        push(`/adminLogs/${log.id}`);
                      }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      ) : (
        <div className="flex items-center justify-center p-8 border border-nccGray-100 rounded-xl bg-nccGray-100">
          <div className="text-base font-medium ">
            Sorry! No data to display
          </div>
        </div>
      )}
    </PageComponent>
  );
};

export default AdminLogs;
