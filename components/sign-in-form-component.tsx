import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useAuth } from "../hooks/use-auth";
import Image from "next/image";

interface ISignInForm {
  cpr: string;
  password: string;
}

export default function SignInFormComponent() {
  const auth = useAuth();
  const { t } = useTranslation("signIn");
  const { t: tErrors } = useTranslation("errors");

  const initialValues: ISignInForm = {
    cpr: "",
    password: "",
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen gap-10 p-8 lg:flex-row bg-amber-50">
        <div className="flex flex-col items-center justify-center gap-3 lg:flex-row lg:justify-start">
          <div className="flex flex-col text-center">
            <Image
              className=""
              src="/logo.svg"
              alt="logo"
              width={200}
              height={100}
            />
            <h1 className="text-xl font-medium text-anzac-900 mt-4">
              Welcome back
            </h1>
            <p className="text-sm text-primary-focus">NCC dashboard</p>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-md p-10 bg-white shadow-2xl rounded-2xl shadow-primary-focus/20">
          <div className="flex flex-col items-center w-full gap-6">
            <div className="text-xl font-bold ">{t("signIn")}</div>
            <Formik
              initialValues={initialValues}
              validationSchema={yup.object({
                cpr: yup
                  .string()
                  .min(9)
                  .max(9)
                  .required(`${tErrors("requiredField")}`),
                password: yup.string().required(`${tErrors("requiredField")}`),
              })}
              onSubmit={async (values, actions) => {
                await auth.signIn(values.cpr, values.password);
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
                <Form className="flex flex-col w-full gap-6 ">
                  <div className="flex flex-col">
                    <label className="label">{t("cpr")}</label>
                    <Field
                      name="cpr"
                      type="text"
                      placeholder="CPR"
                      className={`input input-bordered input-primary ${
                        errors.cpr && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.cpr && touched.cpr && errors.cpr}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label className="label">{t("password")}</label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className={`input input-bordered input-primary ${
                        errors.password && "input-error"
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting && "loading"}`}
                    disabled={isSubmitting}
                  >
                    {t("signIn")}
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
