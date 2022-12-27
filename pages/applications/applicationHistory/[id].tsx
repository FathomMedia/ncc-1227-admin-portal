import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import applications from "..";
import { PageComponent } from "../../../components/page-component";
import { AdminLog } from "../../../src/API";
import { getApplicationLogHistory } from "../../../src/CustomAPI";

import { GetServerSideProps } from "next";
import { useAuth } from "../../../hooks/use-auth";
import { withSSRContext } from "aws-amplify";
import { BsFillEyeFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

interface Props {
  applicationHistory: AdminLog[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  let applicationHistory = await getApplicationLogHistory(`${id}`);

  return {
    props: { applicationHistory: applicationHistory },
  };
};

export default function ApplicationLog({ applicationHistory }: Props) {
  const router = useRouter();
  const { id } = router.query;

  const [logHistory, setLogHistory] = useState<(AdminLog | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Table Data Pagination
  const elementPerPage = 10;
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [disableForward, setDisableForward] = useState(false);
  const [disableBackward, setDisableBackward] = useState(true);
  const [shownData, setShownData] = useState<any>([]);

  useEffect(() => {
    setNumberOfPages(Math.ceil((applications?.length ?? 0) / elementPerPage));
    return () => {};
  }, [[applications]]);

  useEffect(() => {
    setDisableBackward(true);
    setDisableForward(true);

    if (currentPage > 1) {
      setDisableBackward(false);
    }

    if (currentPage < numberOfPages) {
      setDisableForward(false);
    }

    return () => {};
  }, [currentPage, numberOfPages]);

  useEffect(() => {
    paginate();
    return () => {};
  }, [applications, currentPage]);

  function goNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function goPrevPage() {
    setCurrentPage(currentPage - 1);
  }

  function paginate() {
    setShownData(
      logHistory?.slice(
        (currentPage - 1) * elementPerPage,
        currentPage * elementPerPage
      )
    );
  }
  // Table Data Pagination

  return (
    <div>
      <PageComponent title={"ApplicationLog"}>
        <div>
          <div className=" mb-8">
            <div className=" text-2xl font-semibold">Application Log</div>
            <div className=" text-base font-medium text-gray-500">
              Application ID: {id}
            </div>
          </div>

          {/* modal dialogue - adds university to db */}
          <div className={` modal ${isSubmitted && "modal-open"}`}>
            <div className="modal-box relative">
              <label
                onClick={() => setIsSubmitted(!isSubmitted)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <div className=" p-4 mb-4">
                <div className="text-lg font-bold">Application Snapshot</div>
                <div>
                  <div>
                    {applicationHistory.map((log) => (
                      <div>{log.snapshot}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* application table */}
          <div>
            <div className="overflow-x-auto w-full h-screen">
              <table className="table w-full ">
                <thead className=" border rounded-xl border-nccGray-100">
                  <tr>
                    <th>Name</th>
                    <th>CPR</th>
                    <th>Date</th>
                    <th>Reason</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {applicationHistory.map((log) => (
                    <tr key={log.id}>
                      <td>{log.admin?.fullName}</td>
                      <td>{log.adminCPR}</td>
                      <td>{`${Intl.DateTimeFormat("en", {
                        timeStyle: "short",
                        dateStyle: "medium",
                      }).format(new Date(log.createdAt))}`}</td>
                      <td>{log.reason}</td>
                      <td>
                        <div className=" flex justify-end">
                          <button className="btn btn-ghost btn-xs relative group">
                            <HiDotsVertical />
                            <div className=" hidden absolute right-6 top-5 bg-white shadow-lg p-1 rounded-lg group-focus:flex flex-col min-w-min">
                              <div
                                className="btn btn-ghost btn-xs hover:bg-anzac-100 hover:cursor-pointer hover:text-anzac-500 flex justify-start w-24 gap-2"
                                onClick={() => {
                                  setIsSubmitted(true);
                                }}
                              >
                                <BsFillEyeFill />
                                View
                              </div>
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot></tfoot>
              </table>
              {/* fake pagination */}
              <div className=" flex justify-center mt-8">
                <div className="btn-group">
                  <button
                    className="btn btn-accent text-anzac-500"
                    onClick={goPrevPage}
                    disabled={disableBackward}
                  >
                    «
                  </button>
                  <button
                    disabled
                    className="btn hover:cursor-auto disabled:btn-accent"
                  >
                    {currentPage}
                  </button>
                  <button
                    className="btn btn-accent  text-anzac-500"
                    onClick={goNextPage}
                    disabled={disableForward}
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageComponent>
    </div>
  );
}
