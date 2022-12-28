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

interface InitialFilterValues {
  search: string;
  applicationStatus: string;
  university: string;
  program: string;
}

export default function Applications() {
  const initialFilterValues: InitialFilterValues = {
    search: "",
    applicationStatus: "",
    university: "",
    program: "",
  };

  const { applications, students } = useStudent();
  const { universityList, programsList } = useEducation();
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

  function filter(values: InitialFilterValues) {
    let filteredApplications = applications?.filter(
      (element) =>
        (findStudentName(element.studentCPR)
          ?.toLowerCase()
          .includes(values.search.toLowerCase()) ||
          element.studentCPR
            .toLowerCase()
            .includes(values.search.toLowerCase())) &&
        (values.applicationStatus
          ? element.status === values.applicationStatus
          : true) &&
        (values.program
          ? element.programs?.items.find(
              (p) => p?.program?.name === values.program
            )
          : true) &&
        (values.university
          ? element.programs?.items.find(
              (p) => p?.program?.university?.name === values.university
            )
          : true)
    );

    setShownData(filteredApplications);
  }

  // ! TODO - reset all filters
  function resetFilters() {
    setShownData(applications);
  }

  return (
    <PageComponent title={"Applications"}>
      <Toaster />
      <div className="mb-8 ">
        <div className="text-2xl font-semibold ">Applications</div>
        <div className="text-base font-medium text-gray-500 ">
          View all student applications.
        </div>
      </div>

      {/* applications search bar */}
      <div className="flex items-center w-full p-4 my-8 border border-nccGray-100 rounded-xl bg-nccGray-100">
        {/* <div className="min-w-fit">
          <div className="text-sm font-semibold text-gray-500 ">
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
        </div> */}

        <div className="flex w-full gap-4 ">
          <Formik
            initialValues={initialFilterValues}
            onSubmit={(values, actions) => {
              console.log("values", values);

              filter(values);
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
              handleReset,
              resetForm,
            }) => (
              <Form className="flex flex-wrap items-end gap-3 p-4">
                {/* Search Bar */}
                <div>
                  <div className="text-sm font-semibold text-gray-500 ">
                    Search for applicants
                  </div>
                  <div>
                    <Field
                      className="input input-bordered"
                      type="text"
                      name="search"
                      placeHolder="Search..."
                      onChange={handleChange}
                      value={values.search}
                    ></Field>
                  </div>
                </div>

                {/* Status filter */}
                <div>
                  <div className="text-sm font-semibold text-gray-500 ">
                    Status
                  </div>
                  <div>
                    <Field
                      className="input input-bordered"
                      as="select"
                      name="applicationStatus"
                      onChange={handleChange}
                      value={values.applicationStatus}
                    >
                      <option value={""}>All</option>

                      {Object.keys(Status).map((status) => (
                        <option value={status} key={status}>
                          {status.replace("_", " ")}
                        </option>
                      ))}
                      {/* <option value={Status.ELIGIBLE}>ELIGIBLE</option>
                      <option value={Status.APPROVED}>APPROVED</option>
                      <option value={Status.REJECTED}>REJECTED</option>
                      <option value={Status.WITHDRAWN}>WITHDRAWN</option>
                      <option value={Status.REVIEW}>REVIEW</option>
                      <option value={Status.NOT_COMPLETED}>
                        NOT COMPLETED
                      </option> */}
                    </Field>
                  </div>
                </div>

                {/* University filter */}
                <div>
                  <div className="text-sm font-semibold text-gray-500 ">
                    University
                  </div>
                  <div>
                    <Field
                      className="input input-bordered"
                      as="select"
                      name="university"
                      onChange={handleChange}
                      value={values.university}
                    >
                      <option value={""}>All</option>
                      {universityList?.map((uni) => (
                        <option key={`${uni.id}`} value={`${uni.name}`}>
                          {uni.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                {/* Program filter */}
                <div>
                  <div className="text-sm font-semibold text-gray-500 ">
                    Program
                  </div>
                  <div>
                    <Field
                      className="input input-bordered"
                      as="select"
                      name="program"
                      onChange={handleChange}
                      value={values.program}
                    >
                      <option value={""}>All</option>
                      {programsList?.map((program, index) => (
                        <option key={index} value={`${program.name}`}>
                          {program.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-4 ">
                  <button
                    type="submit"
                    className={`min-w-[8rem] px-4 py-2 border-2 border-anzac-400 btn btn-primary btn-md bg-anzac-400 text-white text-xs font-bold hover:cursor-pointer`}
                  >
                    Apply Filters
                  </button>
                  <div
                    onClick={() => {
                      handleReset();
                      resetFilters();
                    }}
                    className=" btn btn-ghost min-w-fit"
                  >
                    Reset filters
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* applications table with pagination*/}
      <div>
        <div className="w-full h-screen overflow-x-auto">
          <table className="table w-full ">
            <thead className="border rounded-xl border-nccGray-100">
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
                      <input
                        type="checkbox"
                        className="checkbox"
                        title="selectApplications"
                      />
                    </label>
                  </th>
                  <td>
                    <div className="flex flex-col justify-between ">
                      <div className="text-sm font-semibold ">{`${findStudentName(
                        datum.studentCPR
                      )}`}</div>
                      <div className="text-sm ">{`${datum.studentCPR}`}</div>
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
                    <div className="flex flex-col gap-4 ">
                      {datum.programs?.items.map(
                        (value: any, index: number) => (
                          <div
                            key={index}
                            className=""
                          >{`${value?.program?.name} - ${value?.program?.university?.name}`}</div>
                        )
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-between ">{`${Intl.DateTimeFormat(
                      "en",
                      { timeStyle: "short", dateStyle: "medium" }
                    ).format(new Date(datum.createdAt))}`}</div>
                  </td>

                  <td>
                    <div className="flex justify-end ">
                      <button className="relative btn btn-ghost btn-xs group">
                        <HiDotsVertical />
                        <div className="absolute flex-col hidden p-1 bg-white rounded-lg shadow-lg right-6 top-5 group-focus:flex min-w-min">
                          <div
                            className="flex justify-start w-24 gap-2 btn btn-ghost btn-xs hover:bg-anzac-100 hover:cursor-pointer hover:text-anzac-500"
                            onClick={() => {
                              push(`/applications/${datum.id}`);
                            }}
                          >
                            <BsFillEyeFill />
                            View
                          </div>
                          <div
                            className="flex justify-start w-24 gap-2 btn btn-ghost btn-xs hover:bg-anzac-100 hover:cursor-pointer hover:text-anzac-500"
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
          <div className="flex justify-center mt-8 ">
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
                className="btn btn-accent text-anzac-500"
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
