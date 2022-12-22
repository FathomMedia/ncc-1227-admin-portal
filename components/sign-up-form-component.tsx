import { Formik, Form, Field } from "formik";
import React from "react";
import * as yup from "yup";

import { PageComponent } from "./page-component";
import { useAuth } from "../hooks/use-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";

export interface ISignUpForm {
  cpr: string;
  fullName: string;
  email: string;
}

export default function SignUpFormComponent() {
  const { push } = useRouter();
  const { checkIfCprExist } = useAuth();
  const { admins } = useAppContext();

  const initialValues: ISignUpForm = {
    cpr: "",
    fullName: "",
    email: "",
  };

  async function createAdminUser(values: ISignUpForm) {
    try {
      await checkIfCprExist(values.cpr).then(async (exist) => {
        if (exist) {
          throw new Error("CPR already exists");
        }

        let findEmail = admins?.listAdmins?.items.find(
          (value) => value?.email === values.email
        );

        if (findEmail?.email !== undefined) {
          throw new Error(
            "The email given is already linked to an existing account"
          );
        } else {
          console.log("email ", findEmail?.email);

          if (findEmail !== null && findEmail !== undefined) {
            throw new Error("Failed to process admin account");
          }

          await fetch("../../api/createAdminUser", {
            method: "POST",
            body: JSON.stringify(values),
          })
            .then(async (values) => {
              let res = await values.json();
              if (values.status === 200) {
                push("/users");
              } else {
                throw new Error(`${res.error.message}`);
              }
              console.log(values);
            })
            .catch((error) => {
              console.log("createAdminUser", error);
              throw new Error(`${error}`);
            });
        }
      });
    } catch (err) {
      throw err;
    }
  }

  return (
    <PageComponent title={"Add Admin User"}>
      <div>
        <div className="flex flex-col justify-between">
          <div className=" text-xl font-bold mb-8">Sign Up New Admin</div>
          <div className=" ">
            <Formik
              initialValues={initialValues}
              validationSchema={yup.object({
                cpr: yup.string().min(9).max(9).required(),
                email: yup.string().email().required(),
                fullName: yup.string().required(),
              })}
              onSubmit={async (values, actions) => {
                await toast.promise(createAdminUser(values), {
                  loading: "Loading...",
                  success: "Admin account created successfully",
                  error: (error) => {
                    return `${error.message}`;
                  },
                });

                console.log(values.cpr, values.email, values.fullName);
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
                <Form className="flex flex-col gap-3 p-4">
                  <div className="flex flex-col">
                    <label className="label">CPR</label>
                    <Field
                      name="cpr"
                      type="text"
                      placeholder="CPR"
                      className={`input input-bordered input-primary `}
                    />
                    <label className="label-text-alt text-error">
                      {errors.cpr && touched.cpr && errors.cpr}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label className="label">Full Name</label>
                    <Field
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      className={`input input-bordered input-primary `}
                    />
                    <label className="label-text-alt text-error">
                      {errors.fullName && touched.fullName && errors.fullName}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label className="label">Email</label>
                    <Field
                      name="email"
                      type="text"
                      placeholder="Email address"
                      className={`input input-bordered input-primary `}
                    />
                    <label className="label-text-alt text-error">
                      {errors.email && touched.email && errors.email}
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting && "loading"}`}
                    disabled={isSubmitting}
                  >
                    Add Admin
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
