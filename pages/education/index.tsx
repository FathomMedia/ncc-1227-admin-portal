import React, { useEffect, useState } from "react";
import { PageComponent } from "../../components/page-component";
import { EducationTableHeaders } from "../../constants/table-headers";
import { useEducation } from "../../context/EducationContext";
import { Program } from "../../src/API";
import SearchBarComponent from "../../components/search-bar-component";
import { useRouter } from "next/router";
import SecondaryButton from "../../components/secondary-button";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";

export default function Education() {
  const { universityList, addNewUniversity, syncUniList } = useEducation();
  const { push } = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const [resultList, setResultList] = useState<any>([]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Table Data Pagination
  const elementPerPage = 10;
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [disableForward, setDisableForward] = useState(false);
  const [disableBackward, setDisableBackward] = useState(true);
  const [shownData, setShownData] = useState<any>([]);

  useEffect(() => {
    setNumberOfPages(Math.ceil((resultList?.length ?? 0) / elementPerPage));

    return () => {};
  }, [resultList]);

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
        resultList?.slice(
          (currentPage - 1) * elementPerPage,
          currentPage * elementPerPage
        )
      );
    }

    paginate();

    return () => {};
  }, [currentPage, resultList]);

  function goNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function goPrevPage() {
    setCurrentPage(currentPage - 1);
  }

  useEffect(() => {
    setResultList(universityList);
    return () => {};
  }, [universityList]);
  // Table Data Pagination

  const initialValues = {
    universityName: "",
  };

  function resetList() {
    setResultList(universityList);
  }

  //filter through uni and program list
  function search() {
    let searchUniResult = universityList?.filter((value) => {
      let sameUniName = value.name
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());
      let haveProgramWithName = value.Programs?.items?.filter((prog) =>
        prog?.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
      let isThereAnyPrograms = (haveProgramWithName ?? []).length > 0;

      if (sameUniName || isThereAnyPrograms) {
        return true;
      } else {
        return false;
      }
    });

    if (searchUniResult) {
      setResultList(searchUniResult);
    }
  }

  // allow admins to add, edit university and related program info here
  return (
    <PageComponent title={"Education"}>
      <Toaster />
      <div className="mb-8 ">
        <div className="text-2xl font-semibold ">Education</div>
        <div className="text-base font-medium text-gray-500 ">
          View a list of universities or programs.
        </div>
      </div>

      {/* search bar */}
      <div className="flex items-center justify-between w-full h-32 gap-4 p-4 my-8 border  border-nccGray-100 rounded-xl bg-nccGray-100">
        <div className="w-full ">
          <SearchBarComponent
            searchChange={(value) => {
              setSearchValue(value);

              if (value === "") {
                resetList();
              }
            }}
            onSubmit={(value: string) => {
              setSearchValue(value);
              search();
            }}
          />
        </div>
        <div className="flex justify-between gap-4 ">
          <div
            className="min-w-[8rem] px-4 py-2 border-2 border-anzac-400 rounded-xl bg-anzac-400 text-white text-xs font-bold hover:cursor-pointer"
            onClick={() => setIsSubmitted(!isSubmitted)}
          >
            Add University
          </div>
          <SecondaryButton
            name={"Add Programs"}
            buttonClick={() => {
              push("/education/programs/addProgram");
            }}
          ></SecondaryButton>
        </div>
      </div>

      {/* modal dialogue - adds university to db */}
      <div className={` modal ${isSubmitted && "modal-open"}`}>
        <div className="relative modal-box">
          <label
            onClick={() => setIsSubmitted(!isSubmitted)}
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>
          <div className="p-4 mb-4 ">
            <div className="text-lg font-bold">Add New University</div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={yup.object({
                  universityName: yup
                    .string()
                    .required("Invalid university name"),
                })}
                onSubmit={async (values, actions) => {
                  let uniFound = universityList
                    ?.filter((value) => value._deleted !== true)
                    .find(
                      (value) =>
                        value.name?.toLowerCase() ===
                        values.universityName.toLowerCase()
                    );

                  if (uniFound) {
                    toast.error(
                      "A university already exists with the same name"
                    );
                  } else {
                    setIsSubmitted(true);
                    toast
                      .promise(
                        addNewUniversity(values.universityName).catch(
                          (error) => {
                            throw error;
                          }
                        ),
                        {
                          loading: "Loading...",
                          success: () => {
                            return `University successfully added`;
                          },
                          error: (error) => {
                            return `${error?.message}`;
                          },
                        }
                      )
                      .then(async (val) => {
                        await syncUniList();

                        return val;
                      })
                      .catch((err) => {
                        console.log(err);
                      })
                      .finally(() => {
                        setIsSubmitted(false);
                      });
                  }
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
                    <div className="flex flex-col">
                      <label className="label">University Name</label>
                      <Field
                        name="universityName"
                        type="text"
                        placeholder="University Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`input input-bordered input-primary ${
                          errors.universityName && "input-error"
                        }`}
                      />
                      <label className="label-text-alt text-error">
                        {errors.universityName &&
                          touched.universityName &&
                          errors.universityName}
                      </label>
                    </div>
                    <button
                      type="submit"
                      className={`btn btn-primary ${isSubmitting && "loading"}`}
                      disabled={isSubmitting || !isValid}
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {/* Education Table */}
      <div>
        <div className="w-full h-screen overflow-x-auto">
          <table className="table w-full table-fixed">
            <thead className="">
              <tr>
                {EducationTableHeaders.map((title, index) => (
                  <th className=" bg-nccGray-100" key={index}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shownData?.map((datum: any, index: number) => (
                <tr key={index}>
                  <td key={datum.id}>
                    <div className="flex justify-between ">{`${datum.name}`}</div>
                  </td>
                  <td className="overflow-x-scroll " key={index}>
                    {datum.Programs?.items.map((program: Program) => (
                      <div
                        key={program?.id}
                        className="mr-2 badge badge-accent text-primary-content hover:cursor-pointer"
                        onClick={() => {
                          push(`/education/programs/${program.id}`);
                        }}
                      >
                        {program?.name}
                      </div>
                    ))}

                    {datum.Programs?.items.length === 0 && (
                      <div className="badge badge-error text-error-content">
                        No Programs
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
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
