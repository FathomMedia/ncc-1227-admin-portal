import { Button } from "@aws-amplify/ui-react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsFillEyeFill } from "react-icons/bs";
import { HiDotsVertical, HiOutlineClipboardList } from "react-icons/hi";
import { PageComponent } from "../../components/page-component";
import SearchBarComponent from "../../components/search-bar-component";
import { StudentsTableHeaders } from "../../constants/table-headers";
import { useEducation } from "../../context/EducationContext";
import { useStudent } from "../../context/StudentContext";
import { Status } from "../../src/API";

export default function Applications() {
  const { applications, students } = useStudent();
  const { universityList, programsList } = useEducation();
  const { push } = useRouter();

  const [searchValue, setSearchValue] = useState("");

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
  }, [applications?.length]);

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
    function paginate() {
      setShownData(
        applications?.slice(
          (currentPage - 1) * elementPerPage,
          currentPage * elementPerPage
        )
      );
    }
    paginate();
    return () => {};
  }, [applications, currentPage]);

  function goNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function goPrevPage() {
    setCurrentPage(currentPage - 1);
  }

  function findStudentName(id: string) {
    return students?.find((value) => value.cpr === id)?.fullName;
  }
  // Table Data Pagination

  //search for admin user
  function search() {
    let searchResult = applications?.filter(
      (application) =>
        findStudentName(application.studentCPR)
          ?.toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        application.studentCPR.toLowerCase().includes(searchValue.toLowerCase())
    );

    setShownData(searchResult);
  }

  // ! TODO - reset all filters
  function resetFilters() {
    setShownData(applications);
    setSearchValue("");
  }

  return (
    <PageComponent title={"Applications"}>
      <Toaster />
      <div className=" mb-8">
        <div className=" text-2xl font-semibold">Applications</div>
        <div className=" text-base font-medium text-gray-500">
          View all student applications.
        </div>
      </div>

      {/* applications search bar */}
      <div className=" my-8 p-4 w-full h-32 border border-nccGray-100 rounded-xl bg-nccGray-100 flex items-center ">
        <div className=" flex gap-4 w-full ">
          <div className=" grow py-4">
            <div className=" text-sm font-semibold text-gray-500">
              Search for applicants
            </div>
            <SearchBarComponent
              searchChange={(value) => {
                console.log(value);
                setSearchValue(value);
              }}
              onSubmit={(value: string) => {
                setSearchValue(value);
                search();
              }}
            />
          </div>

          <Formik
            initialValues={{
              applicationStatus: undefined,
              university: undefined,
              program: undefined,
            }}
            onSubmit={(values, actions) => {
              console.log("values", values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              isValid,
            }) => (
              <Form className="flex flex-col gap-3 p-4">
                <div className=" flex gap-4">
                  <div>
                    <div className=" text-sm font-semibold text-gray-500 mb-1">
                      Status
                    </div>
                    <div>
                      <Field
                        className=" border rounded-xl"
                        as="select"
                        name="applicationStatus"
                      >
                        <option value={undefined}>All</option>
                        <option value="ELIGIBLE">ELIGIBLE</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="WITHDRAWN">WITHDRAWN</option>
                        <option value="REVIEW">REVIEW</option>
                      </Field>
                    </div>
                  </div>
                  <div>
                    <div className=" text-sm font-semibold text-gray-500 mb-1">
                      University
                    </div>
                    <div>
                      <Field
                        className=" border rounded-xl"
                        as="select"
                        name="university"
                      >
                        <option value={undefined}>All</option>
                        {universityList?.map((uni) => (
                          <option key={`${uni.id}`} value={`${uni.name}`}>
                            {uni.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div>
                    <div className=" text-sm font-semibold text-gray-500 mb-1">
                      Program
                    </div>
                    <div>
                      <Field
                        className=" border rounded-xl"
                        as="select"
                        name="program"
                      >
                        <option value={undefined}>All</option>
                        {programsList?.map((program, index) => (
                          <option key={index} value={`${program.name}`}>
                            {program.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div className=" flex justify-between gap-4 items-center">
                    <Link
                      href={""}
                      onClick={resetFilters}
                      className=" link link-primary min-w-fit"
                    >
                      Reset filters
                    </Link>

                    <button
                      type="submit"
                      className={`min-w-[8rem] px-4 py-2 border-2 border-anzac-400 rounded-xl bg-anzac-400 text-white text-xs font-bold hover:cursor-pointer`}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

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
              {shownData?.map((datum: any, index: number) => (
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
                      {datum.programs?.items.map(
                        (value: any, index: number) => (
                          <div
                            key={index}
                            className=" "
                          >{`${value?.program?.name} - ${value?.program?.university?.name}`}</div>
                        )
                      )}
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
