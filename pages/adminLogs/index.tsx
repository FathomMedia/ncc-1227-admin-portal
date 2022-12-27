import React, { useEffect, useState } from "react";
import { PageComponent } from "../../components/page-component";
import { listAllAdminsLogs } from "../../src/CustomAPI";
import { AdminLog } from "../../src/API";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function adminLogs() {
  const [adminsLogs, setAdminsLogs] = useState<AdminLog[]>([]);

  const { push } = useRouter();

  useEffect(() => {
    getAdminsLogsList();

    return () => {};
  }, []);

  async function getAdminsLogsList() {
    let res = await listAllAdminsLogs();
    setAdminsLogs(res);
    console.log(res);
    return res;
  }

  return (
    <PageComponent title={"Admin Logs"}>
      <Toaster />
      <div className=" mb-8">
        <div className=" text-2xl font-semibold">Admin Log History</div>
        <div className=" text-base font-medium text-gray-500">
          View all logs made by other admins.
        </div>
      </div>
      <table className="table w-full ">
        <thead className=" border rounded-xl border-nccGray-100">
          <tr>
            <th>Name</th>
            <th>CPR</th>
            <th>Date</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {adminsLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.admin?.fullName}</td>
              <td>{log.adminCPR}</td>
              <td>{`${Intl.DateTimeFormat("en", {
                timeStyle: "short",
                dateStyle: "medium",
              }).format(new Date(log.createdAt))}`}</td>
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
    </PageComponent>
  );
}
