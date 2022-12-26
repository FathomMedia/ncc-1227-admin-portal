import { Field, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsFillEyeFill } from "react-icons/bs";
import { HiDotsVertical, HiOutlineClipboardList } from "react-icons/hi";
import { PageComponent } from "../../components/page-component";
import PrimaryButton from "../../components/primary-button";
import SearchBarComponent from "../../components/search-bar-component";
import { StudentsTableHeaders } from "../../constants/table-headers";
import { useStudent } from "../../context/StudentContext";
import { Status } from "../../src/API";

export default function Applications() {
  const { applications, students } = useStudent();
  const { push } = useRouter();

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
      applications?.slice(
        (currentPage - 1) * elementPerPage,
        currentPage * elementPerPage
      )
    );
  }

  function findStudentName(id: string) {
    return students?.find((value) => value.cpr === id)?.fullName;
  }
  // Table Data Pagination

  // ! TODO - reset all filters
  function resetFilters() {}

  return (
    <PageComponent title={"Applications"}>
      <Toaster />
      <div className=" mb-8">
        <div className=" text-2xl font-semibold">Applications</div>
        <div className=" text-base font-medium text-gray-500">
          View all student applications.
        </div>
      </div>

      {/* add formik functionality */}
      <Formik
        initialValues={{
          applicationStatus: "",
          university: "",
          program: "",
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {/* applications search bar */}
        <div className=" my-8 p-4 w-full h-32 border border-nccGray-100 rounded-xl bg-nccGray-100 flex justify-between items-center gap-4">
          <div className=" ">
            <div>
              <div className=" text-sm font-semibold text-gray-500">
                Search for applicants
              </div>
              <SearchBarComponent
                searchChange={(value) => {}}
                onSubmit={(value: string) => {}}
              />
            </div>
          </div>
          <div>
            <div className=" text-sm font-semibold text-gray-500">Status</div>
            <div>
              <Field
                className=" border rounded-xl"
                as="select"
                name="applicationStatus"
              >
                <option disabled value={undefined}>
                  Select
                </option>
                <option value="ELIGIBLE">ELIGIBLE</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
                <option value="WITHDRAWN">WITHDRAWN</option>
                <option value="REVIEW">REVIEW</option>
              </Field>
            </div>
          </div>
          <div>
            <div className=" text-sm font-semibold text-gray-500">
              University
            </div>
            <div>
              {/* todo - add all universities as options*/}
              <Field
                className=" border rounded-xl"
                as="select"
                name="university"
              >
                <option disabled value={undefined}>
                  Select
                </option>
              </Field>
            </div>
          </div>
          <div>
            <div className=" text-sm font-semibold text-gray-500">Program</div>
            <div>
              {/* todo - add all programs as options */}
              <Field className=" border rounded-xl" as="select" name="program">
                <option disabled value={undefined}>
                  Select
                </option>
              </Field>
            </div>
          </div>
          <div className=" flex justify-between gap-4 items-center">
            <Link href={""} className=" link link-primary min-w-fit">
              Reset filters
            </Link>
            <PrimaryButton
              name={"Apply Filters"}
              buttonClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            ></PrimaryButton>
          </div>
        </div>
      </Formik>

      {/* applications table with pagination*/}
      <div>
        <div className="overflow-x-auto w-full h-screen">
          <table className="table w-full ">
            <thead className=" border rounded-xl border-nccGray-100">
              <tr>
                {StudentsTableHeaders.map((title, index) => (
                  <th className=" bg-nccGray-100" key={index}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications?.map((datum, index) => (
                <tr key={index}>
                  <th key={datum?.id}>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className=" flex flex-col justify-between">
                      <div className=" text-sm font-semibold">{`${findStudentName(
                        datum.studentCPR
                      )}`}</div>
                      <div className=" text-sm ">{`${datum.studentCPR}`}</div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`badge text-sm font-semibold 
                        ${
                          datum.status === Status.REVIEW &&
                          "text-primary-content badge-accent"
                        } 
                        ${
                          datum.status === Status.WITHDRAWN ||
                          (datum.status === Status.REJECTED &&
                            "text-error-content badge-error")
                        } 
                        ${
                          datum.status === Status.APPROVED &&
                          "text-success-content badge-success"
                        }
                        ${
                          datum.status === Status.ELIGIBLE &&
                          "text-info-content badge-info"
                        }
                        mr-2`}
                    >{`${datum.status}`}</div>
                  </td>
                  <td>
                    <div className=" flex flex-col gap-4">
                      {datum.programs?.items.map((value, index) => (
                        <div
                          key={index}
                          className=" "
                        >{`${value?.program?.name} - ${value?.program?.university?.name}`}</div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className=" flex justify-between">{`${Intl.DateTimeFormat(
                      "en",
                      { timeStyle: "short", dateStyle: "medium" }
                    ).format(new Date(datum.createdAt))}`}</div>
                  </td>

                  <td>
                    <div className=" flex justify-end">
                      <button className="btn btn-ghost btn-xs relative group">
                        <HiDotsVertical />
                        <div className=" hidden absolute right-6 top-5 bg-white shadow-lg p-1 rounded-lg group-focus:flex flex-col min-w-min">
                          <div
                            className="btn btn-ghost btn-xs hover:bg-anzac-100 hover:cursor-pointer hover:text-anzac-500 flex justify-start w-24 gap-2"
                            onClick={() => {
                              push(`/applications/${datum.id}`);
                            }}
                          >
                            <BsFillEyeFill />
                            View
                          </div>
                          <div
                            className="btn btn-ghost btn-xs hover:bg-anzac-100 hover:cursor-pointer hover:text-anzac-500 flex justify-start w-24 gap-2"
                            onClick={() => {
                              push(
                                `/applications/applicationHistory/${datum.id}`
                              );
                            }}
                          >
                            <HiOutlineClipboardList />
                            History
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
    </PageComponent>
  );
}
