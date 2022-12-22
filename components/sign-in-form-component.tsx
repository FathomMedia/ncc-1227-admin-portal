import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useAuth } from "../hooks/use-auth";
interface ISignInForm {
  cpr: string;
  password: string;
}

export default function SignInFormComponent() {
  const auth = useAuth();

  const initialValues: ISignInForm = {
    cpr: "",
    password: "",
  };

  return (
    <div>
      <div className=" min-h-screen flex justify-center items-center">
        <div className=" border rounded-xl min-w-min p-4">
          <div className="flex flex-col items-center">
            <div className=" text-xl font-bold ">Sign In</div>
            <Formik
              initialValues={initialValues}
              validationSchema={yup.object({
                cpr: yup.string().min(9).max(9).required(),
                password: yup.string().required(),
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
                <Form className="flex flex-col gap-3 p-4">
                  <div className="flex flex-col">
                    <label className="label">CPR</label>
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
                    <label className="label">Password</label>
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
                    Sign In
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
