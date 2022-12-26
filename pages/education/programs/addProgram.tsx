import { Formik, Form, Field } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { PageComponent } from "../../../components/page-component";
import * as yup from "yup";
import { useEducation } from "../../../context/EducationContext";
import { useRouter } from "next/navigation";

interface Props {
  programName: string;
  universityID: string | undefined;
  availability: number;
  requirements: string;
}

export default function AddProgram() {
  const { push } = useRouter();
  const {
    universityList,
    addProgramToUni,
    universityPrograms,
    getProgramsFromUniID,
  } = useEducation();

  const initialValues = {
    programName: "",
    universityID: undefined,
    availability: 0,
    requirements: "",
  };

  return (
    <div>
      <PageComponent title={"AddProgram"}>
        <div>
          {/* title */}
          <div>Add Program</div>
          {/* fields */}
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={yup.object({
                programName: yup.string().required("Invalid program name"),
                universityID: yup.string().required("University is required"),
                availability: yup
                  .number()
                  .required("Number of seats available required"),
                requirements: yup
                  .string()
                  .required("Program requirements is required"),
              })}
              onSubmit={async (values, actions) => {
                let getPrograms = await getProgramsFromUniID(
                  values.universityID!
                );

                let programFound = getPrograms?.Programs?.items
                  .filter((value) => value?._deleted !== true)
                  .find(
                    (value) =>
                      value?.name?.toLowerCase() ===
                      values.programName?.toLowerCase()
                  );

                if (programFound) {
                  toast.error(
                    "There is an existing Program with the same name"
                  );
                } else {
                  toast.promise(
                    addProgramToUni(
                      values.universityID!,
                      values.programName,
                      values.availability,
                      values.requirements
                    ).catch((error) => {
                      throw error;
                    }),
                    {
                      loading: "Loading...",
                      success: () => {
                        push("../");
                        return `Program successfully added`;
                      },
                      error: (error) => {
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
                <Form className="flex flex-col gap-3 p-4">
                  <div className="flex flex-col">
                    <label className="label">Program Name</label>
                    <Field
                      name="programName"
                      type="text"
                      placeholder="Program Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input input-bordered input-primary ${
                        errors.programName && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.programName &&
                        touched.programName &&
                        errors.programName}
                    </label>
                  </div>

                  <div className="flex flex-col">
                    <label className="label">University ID</label>
                    <Field
                      as="select"
                      name="universityID"
                      placeholder="University ID"
                      onChange={(event: any) => {
                        handleChange(event);
                      }}
                      onBlur={handleBlur}
                      className={`input input-bordered input-primary ${
                        errors.universityID && "input-error"
                      }`}
                      value={values.universityID}
                    >
                      <option disabled value={undefined}>
                        Select
                      </option>
                      {universityList?.map((uni) => (
                        <option key={uni.id} value={uni.id}>
                          {uni?.name}
                        </option>
                      ))}
                    </Field>
                    <label className="label-text-alt text-error">
                      {errors.universityID &&
                        touched.universityID &&
                        errors.universityID}
                    </label>
                  </div>

                  <div className="flex flex-col">
                    <label className="label">Availability</label>
                    <Field
                      name="availability"
                      type="number"
                      min="0"
                      placeholder="Availability"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input input-bordered input-primary ${
                        errors.availability && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.availability &&
                        touched.availability &&
                        errors.availability}
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Program Requirements</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Requirements"
                      name="requirements"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    <label className="label-text-alt text-error">
                      {errors.requirements &&
                        touched.requirements &&
                        errors.requirements}
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
      </PageComponent>
    </div>
  );
}
