import { Field, Form, Formik } from "formik";
import React, { useDeferredValue } from "react";
import {
  University,
  UpdateProgramMutationVariables,
  UpdateUniversityMutationVariables,
} from "../src/API";
import * as yup from "yup";
import { updateProgramById, updateUniversityById } from "../src/CustomAPI";
import { update } from "lodash";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useEducation } from "../context/EducationContext";

interface Props {
  university: University | undefined;
}

export default function UniversityFormComponent({ university }: Props) {
  const { push } = useRouter();
  const { syncUniList } = useEducation();

  const initialValues = {
    universityName: university?.name ?? "",
    isDeactivated: university?.isDeactivated ?? false,
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          universityName: yup.string().required("Invalid university name"),
        })}
        onSubmit={async (values, actions) => {
          if (university) {
            let updatedUniDetails: UpdateUniversityMutationVariables = {
              input: {
                id: university.id,
                name: values.universityName,
                isDeactivated: values.isDeactivated,
                _version: university?._version,
              },
            };

            await toast.promise(
              updateUniversityById(updatedUniDetails)
                .then(() => {
                  university?.Programs?.items.map(async (uniProgram) => {
                    if (uniProgram) {
                      let updateProgram: UpdateProgramMutationVariables = {
                        input: {
                          id: uniProgram.id,
                          isDeactivated: values.isDeactivated,
                          _version: uniProgram?._version,
                        },
                      };
                      await updateProgramById(updateProgram)
                        .catch((err) => {
                          throw err;
                        })
                        .finally(async () => {
                          await syncUniList();
                          push("../");
                        });
                    }
                  });
                })
                .catch((err) => {
                  throw err;
                }),
              {
                loading: "Loading...",
                success: "University updated successfully",
                error: (error: any) => {
                  return `${error?.message}`;
                },
              }
            );
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
          <Form className="flex flex-col gap-6">
            <div className=" flex justify-between">
              <div className=" flex justify-between items-center gap-10">
                <div className="text-base font-medium">Name</div>
                <div>
                  <Field
                    name="universityName"
                    type="text"
                    placeholder="Program Name"
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
              </div>

              <div className=" w-[150px] flex justify-between items-center">
                <div className="text-base font-medium">Deactivate?</div>
                <div>
                  <Field
                    name="isDeactivated"
                    type="checkbox"
                    placeholder="Deactivate?"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={` checkbox text-orange-50 checkbox-error ${
                      errors.isDeactivated && "input-error"
                    }`}
                  />
                  <label className="label-text-alt text-error">
                    {errors.isDeactivated &&
                      touched.isDeactivated &&
                      errors.isDeactivated}
                  </label>
                </div>
              </div>
            </div>

            <div className="text-base font-medium">Programs</div>
            <div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {university?.Programs?.items.map((program) => {
                      return (
                        <tr key={program?.id}>
                          <td>{program?.name}</td>
                          <td>
                            {program?.isDeactivated ? "Inactive" : "Active"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting && "loading"}`}
              disabled={isSubmitting || !isValid}
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
