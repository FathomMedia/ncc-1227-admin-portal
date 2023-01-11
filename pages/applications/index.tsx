import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Toaster } from "react-hot-toast";
import { BsFillEyeFill } from "react-icons/bs";
import { HiDotsVertical, HiOutlineClipboardList } from "react-icons/hi";
import { DateRangeComponent } from "../../components/date-range-component";
import { PageComponent } from "../../components/page-component";
import { StudentsTableHeaders } from "../../constants/table-headers";
import { useEducation } from "../../context/EducationContext";
import { useStudent } from "../../context/StudentContext";
import { Application, Status } from "../../src/API";
import { getStatusOrder } from "../../src/Helpers";

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

  const { applications, students, dateRange, updateDateRange } = useStudent();
  const { universityList, programsList } = useEducation();
  const { push } = useRouter();

  // Table Data Pagination
  const elementPerPage = 10;
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [disableForward, setDisableForward] = useState(false);
  const [disableBackward, setDisableBackward] = useState(true);
  const [shownData, setShownData] = useState<Application[] | undefined>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application[]>(
    []
  );

  // let selectedApplication: Application[] = [];

  let sortedApplications = applications
    ?.sort(
      (a, b) =>
        (a.student?.householdIncome ?? 0) - (b.student?.householdIncome ?? 0)
    )
    .sort((a, b) => (b.gpa ?? 0) - (a.gpa ?? 0))
    .sort((a, b) => {
      if (a.status && b.status) {
        if (getStatusOrder(b.status) > getStatusOrder(a.status)) return 1;
        if (getStatusOrder(b.status) < getStatusOrder(a.status)) return -1;
      }
      return 0;
    });
  useEffect(() => {
    setNumberOfPages(
      Math.ceil((sortedApplications?.length ?? 0) / elementPerPage)
    );

    return () => {};
  }, [sortedApplications?.length]);

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
        sortedApplications?.slice(
          (currentPage - 1) * elementPerPage,
          currentPage * elementPerPage
        )
      );
    }
    paginate();
    return () => {};
  }, [sortedApplications, currentPage]);

  function addToSelected(app: Application) {
    setSelectedApplication([...selectedApplication, app]);
  }
  function removeFromSelected(app: Application) {
    setSelectedApplication(
      selectedApplication.filter((a: Application) => a.id !== app.id)
    );
  }

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
    let filteredApplications = sortedApplications?.filter(
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
    setShownData(sortedApplications);
  }

  return (
    <PageComponent title={"Applications"}>
      <Toaster />
      <div className="flex flex-wrap items-center justify-between mb-8 ">
        <div className="">
          <div className="text-2xl font-semibold ">Applications</div>
          <div className="text-base font-medium text-gray-500 ">
            View all student applications.
          </div>
        </div>
        <DateRangeComponent
          dateRange={dateRange}
          updateRange={updateDateRange}
        ></DateRangeComponent>
      </div>

      {/* applications search bar */}
      <div className="flex items-center w-full p-4 my-8 border border-nccGray-100 rounded-xl bg-nccGray-100">
        <div className="flex w-full gap-4 ">
          <Formik
            initialValues={initialFilterValues}
            onSubmit={(values) => {
              filter(values);
            }}
          >
            {({ values, handleChange, handleReset }) => (
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
                      placeholder="Search..."
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
      {(shownData?.length ?? 0) > 0 ? (
        <div>
          <div className="w-full h-screen overflow-x-auto">
            <table className="table w-full ">
              <thead className="border rounded-xl border-nccGray-100">
                <tr>
                  {StudentsTableHeaders.map((title, index) =>
                    index !== 0 ? (
                      <th className=" bg-nccGray-100" key={index}>
                        {title}
                      </th>
                    ) : selectedApplication.length > 0 ? (
                      <th className=" bg-nccGray-100" key={index}>
                        <CSVLink
                          className="text-xs hover:!text-white btn btn-primary btn-sm btn-outline"
                          filename={`${new Date().getFullYear()}-Applications-${new Date().toISOString()}.csv`}
                          data={[
                            ...selectedApplication.map((app, index) => {
                              let sortedProgramChoices =
                                app.programs?.items?.sort(
                                  (a, b) =>
                                    (a?.choiceOrder ?? 0) -
                                    (b?.choiceOrder ?? 0)
                                );

                              return {
                                row: index + 1,
                                applicationId: app.id,
                                gpa: app.gpa,
                                status: app.status,
                                studentCPR: app.studentCPR,
                                dateTime: app.dateTime,
                                primaryProgramID:
                                  sortedProgramChoices?.[0]?.program?.id,
                                primaryProgram: `${sortedProgramChoices?.[0]?.program?.name}-${sortedProgramChoices?.[0]?.program?.university?.name}`,
                                secondaryProgramID:
                                  sortedProgramChoices?.[1]?.program?.id,
                                secondaryProgram: `${sortedProgramChoices?.[1]?.program?.name}-${sortedProgramChoices?.[1]?.program?.university?.name}`,
                              };
                            }),
                          ]}
                          key={index}
                          onClick={() => {
                            setSelectedApplication([]);
                          }}
                        >
                          CSV
                        </CSVLink>
                      </th>
                    ) : (
                      <th className=" bg-nccGray-100" key={index}></th>
                    )
                  )}
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
                          checked={
                            selectedApplication.find(
                              (app: Application) => app.id === datum.id
                            ) !== undefined
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              addToSelected(datum as Application);
                            } else {
                              removeFromSelected(datum as Application);
                            }
                          }}
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
                          (datum.status === Status.NOT_COMPLETED && "") ||
                          (datum.status === Status.REVIEW &&
                            "text-primary-content badge-accent")
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
                      >{`${datum.status?.replace("_", " ")}`}</div>
                    </td>
                    <td>
                      <div className="flex justify-between ">{datum.gpa}</div>
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
                      <div className="flex justify-between ">{`${Intl.DateTimeFormat(
                        "en",
                        { timeStyle: "short", dateStyle: "medium" }
                      ).format(new Date(datum.updatedAt))}`}</div>
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
      ) : (
        <div className="flex items-center justify-center p-8 border border-nccGray-100 rounded-xl bg-nccGray-100">
          <div className="text-base font-medium ">
            Sorry! No data to display
          </div>
        </div>
      )}
    </PageComponent>
  );
}
