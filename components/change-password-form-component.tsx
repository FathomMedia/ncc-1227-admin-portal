import { Formik, Form, Field } from "formik";
import React from "react";
import * as yup from "yup";

import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/use-auth";

export interface IChangePasswordForm {
  newPassword: string;
}

export default function ChangePasswordFormComponent() {
  const { push } = useRouter();
  const { user, isChangePasswordRequired } = useAuth();

  const initialValues: IChangePasswordForm = {
    newPassword: "",
  };

  async function changePasswordInCognito(password: string) {
    user?.completeNewPasswordChallenge(password, null, {
      onSuccess(session, userConfirmationNecessary?) {
        console.log(session);
        push("/");
        return session;
      },
      onFailure: () => {
        throw new Error("Failed to change user password");
      },
    });
  }

  return (
    <div>
      <div className=" border rounded-xl p-4">
        <div className="flex flex-col justify-between">
          <div className=" text-xl font-bold mb-4 flex justify-center items-center">
            Change Password
          </div>
          <div className=" ">
            <Formik
              initialValues={initialValues}
              validationSchema={yup.object({
                newPassword: yup.string().required("Password is required"),
              })}
              onSubmit={async (values, actions) => {
                console.log(values.newPassword);
                await toast.promise(
                  changePasswordInCognito(values.newPassword),
                  {
                    loading: "Loading...",
                    success: () => {
                      return `Password changed successfully. Welcome ${user?.getUsername()}`;
                    },
                    error: (error) => {
                      return `${error.message}`;
                    },
                  }
                );
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
                <Form className="flex flex-col gap-8 p-4">
                  <div className="flex flex-col ">
                    <label className="label">New Password</label>
                    <Field
                      name="newPassword"
                      type="password"
                      placeholder="New password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
                      className={`input input-bordered input-primary ${
                        errors.newPassword && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.newPassword &&
                        touched.newPassword &&
                        errors.newPassword}
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting && "loading"}`}
                    disabled={isSubmitting || !isValid}
                  >
                    Set new password
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
