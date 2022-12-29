import { Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import {
  Application,
  CreateAdminLogMutationVariables,
  Status,
  UpdateApplicationMutationVariables,
  UpdateProgramMutationVariables,
} from "../src/API";
import PrimaryButton from "./primary-button";
import * as yup from "yup";
import {
  createAdminLogInDB,
  updateApplicationInDB,
  updateProgramById,
} from "../src/CustomAPI";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/router";
import GetStorageLinkComponent from "./get-storage-link-component";

interface Props {
  application: Application;
  downloadLinks: {
    cprDoc?: string | null;
    acceptanceLetterDoc?: string | null;
    transcriptDoc?: string | null;
    signedContractDoc?: string | null;
  };
  readOnly: boolean;
}

interface IApplicationForm {
  applicationStatus: Status | undefined;
  reason: string | undefined;
  readOnly: false;
}

const initialValues: IApplicationForm = {
  applicationStatus: Status.REVIEW,
  reason: undefined,
  readOnly: false,
};

export default function ViewApplication({
  application,
  downloadLinks,
  readOnly,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const { push } = useRouter();

  return (
    <div className="mx-auto overflow-x-auto">
      <div className="flex justify-end m-4 ">
        {!readOnly && (
          <PrimaryButton
            name={!isEditing ? "Edit" : "Close"}
            buttonClick={function (): void {
              setIsEditing(!isEditing);
            }}
          ></PrimaryButton>
        )}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          reason: yup.string().required(),
        })}
        onSubmit={async (values, actions) => {
          console.log(values.applicationStatus, values.reason);
          let updateVariables: UpdateApplicationMutationVariables = {
            input: {
              id: application.id,
              status: values.applicationStatus,
              _version: application._version,
            },
          };
          let res = await toast
            .promise(updateApplicationInDB(updateVariables), {
              loading: "Updating...",
              success: "Application updated successfully",
              error: "Failed to update application",
            })
            .then(async (value) => {
              setIsEditing(false);
              let createAdminLogVariables: CreateAdminLogMutationVariables = {
                input: {
                  applicationID: application.id,
                  adminCPR: user?.getUsername() ?? "",
                  dateTime: new Date().toISOString(),
                  snapshot: JSON.stringify(application),
                  reason: values.reason,
                  applicationAdminLogsId: application.id,
                  adminAdminLogsCpr: user?.getUsername() ?? "",
                },
              };

              await createAdminLogInDB(createAdminLogVariables)
                .then((value) => {
                  push("/applications");
                  return value;
                })
                .catch((err) => {
                  console.log(err);
                });
            });

          actions.setSubmitting(false);
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
          <Form>
            <table className="table w-full mb-4 table-fixed">
              <thead>
                <tr>
                  <th>Application Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Created at</td>
                  <td>
                    {Intl.DateTimeFormat("en", {
                      timeStyle: "short",
                      dateStyle: "medium",
                    }).format(new Date(application.createdAt))}
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <div className="mb-4 text-sm font-semibold">
                      {application.status === Status.ELIGIBLE
                        ? Status.REVIEW
                        : application.status}
                    </div>
                    {isEditing && (
                      <Field
                        className="border rounded-xl"
                        as="select"
                        name="applicationStatus"
                        value={values.applicationStatus}
                        onBlur={handleBlur}
                      >
                        <option disabled value={Status.REVIEW}>
                          REVIEW
                        </option>
                        <option value={Status.ELIGIBLE}>ELIGIBLE</option>
                        <option value={Status.APPROVED}>APPROVED</option>
                        <option value={Status.REJECTED}>REJECTED</option>
                      </Field>
                    )}
                  </td>
                </tr>
                {!readOnly && (
                  <>
                    <tr>
                      <td>Household Income</td>
                      <td>{application.student?.householdIncome}</td>
                    </tr>
                    <tr>
                      <td>Graduation Date</td>
                      <td>{application.student?.graduationDate}</td>
                    </tr>
                    <tr>
                      <td>School Specialization</td>
                      <td>{application.student?.specialization}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td>GPA</td>
                  <td>{application.gpa}</td>
                </tr>
                <tr>
                  <td>Primary Program</td>
                  <td>{`${
                    application.programs?.items?.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[0]?.program?.name
                  } - ${
                    application.programs?.items?.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[0]?.program?.university?.name
                  }`}</td>
                </tr>
                <tr>
                  <td>Secondary Program</td>
                  <td>{`${
                    application.programs?.items?.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[1]?.program?.name
                  } - ${
                    application.programs?.items?.sort(
                      (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
                    )[0]?.program?.university?.name
                  }`}</td>
                </tr>
                <tr>
                  <td>CPR Document</td>
                  <td>
                    {
                      <GetStorageLinkComponent
                        storageKey={downloadLinks.cprDoc}
                      ></GetStorageLinkComponent>
                    }
                  </td>
                </tr>
                <tr>
                  <td>Acceptance Letter Document</td>
                  <td>
                    {
                      <GetStorageLinkComponent
                        storageKey={downloadLinks.acceptanceLetterDoc}
                      ></GetStorageLinkComponent>
                    }
                  </td>
                </tr>
                <tr>
                  <td>Transcript Document</td>
                  <td>
                    {
                      <GetStorageLinkComponent
                        storageKey={downloadLinks.transcriptDoc}
                      ></GetStorageLinkComponent>
                    }
                  </td>
                </tr>
                <tr>
                  <td>Signed Contract Document</td>
                  <td>
                    {
                      <GetStorageLinkComponent
                        storageKey={downloadLinks.signedContractDoc}
                      ></GetStorageLinkComponent>
                    }
                  </td>
                </tr>
                <tr>
                  <td>Student Logs</td>
                  <td>
                    <Link
                      className="link link-primary"
                      href={`../studentLogs/${application.id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            {isEditing && (
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-base font-medium text-gray-500">
                      Reason
                    </span>
                  </label>
                  <Field
                    as="textarea"
                    placeholder="Reason for changes made..."
                    name="reason"
                    onChange={handleChange}
                    value={values.reason}
                    className={`textarea textarea-bordered h-24 ${
                      errors.reason && "input-error"
                    }`}
                  ></Field>
                </div>
                <div className="flex justify-end m-4 ">
                  <button
                    type="submit"
                    className={`btn btn-primary text-white ${
                      isSubmitting && "loading"
                    }`}
                    disabled={isSubmitting || !isValid}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
