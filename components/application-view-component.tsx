import { Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import {
  Application,
  CreateAdminLogMutationVariables,
  Status,
  UpdateApplicationMutationVariables,
} from "../src/API";
import PrimaryButton from "./primary-button";
import * as yup from "yup";
import { createAdminLogInDB, updateApplicationInDB } from "../src/CustomAPI";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/router";

interface Props {
  application: Application;
  downloadLinks: {
    cprDoc?: string | null;
    acceptanceLetterDoc?: string | null;
    transcriptDoc?: string | null;
    signedContractDoc?: string | null;
  };
}

interface IApplicationForm {
  applicationStatus: Status | undefined;
  reason: string | undefined;
}

const initialValues: IApplicationForm = {
  applicationStatus: Status.REVIEW,
  reason: undefined,
};

export default function ViewApplication({ application, downloadLinks }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const { push } = useRouter();

  return (
    <div className="overflow-x-auto mx-auto">
      <div className=" m-4 flex justify-end">
        <PrimaryButton
          name={!isEditing ? "Edit" : "Close"}
          buttonClick={function (): void {
            setIsEditing(!isEditing);
          }}
        ></PrimaryButton>
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

              await createAdminLogInDB(createAdminLogVariables);
              push("/applications");
            });
          console.log(res);

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
            <table className="table w-full mb-4">
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
                    <div className="text-sm font-semibold mb-4">
                      {application.status === Status.ELIGIBLE
                        ? Status.REVIEW
                        : application.status}
                    </div>
                    {isEditing && (
                      <Field
                        className=" border rounded-xl"
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
                    {downloadLinks.cprDoc ? (
                      <Link
                        className="link link-primary"
                        href={downloadLinks.cprDoc}
                        target="_blank"
                      >
                        View CPR
                      </Link>
                    ) : (
                      "Document Not Available"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Acceptance Letter Document</td>
                  <td>
                    {downloadLinks.acceptanceLetterDoc ? (
                      <Link
                        className="link link-primary"
                        href={downloadLinks.acceptanceLetterDoc}
                        target="_blank"
                      >
                        View Acceptance Letter
                      </Link>
                    ) : (
                      "Document Not Available"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Transcript Document</td>
                  <td>
                    {downloadLinks.transcriptDoc ? (
                      <Link
                        className="link link-primary"
                        href={downloadLinks.transcriptDoc}
                        target="_blank"
                      >
                        View Transcript
                      </Link>
                    ) : (
                      "Document Not Available"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Signed Contract Document</td>
                  <td>
                    {downloadLinks.signedContractDoc ? (
                      <Link
                        className="link link-primary"
                        href={downloadLinks.signedContractDoc}
                        target="_blank"
                      >
                        View Signed Contract
                      </Link>
                    ) : (
                      <span className="text-error">Document Not Available</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Student Logs</td>
                  <td>
                    <Link
                      className="link link-primary"
                      href={"../adminLogs"}
                      target="_blank"
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
                <div className=" flex justify-end m-4">
                  <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting && "loading"}`}
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
