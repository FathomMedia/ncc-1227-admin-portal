import { Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useAuth } from "../hooks/use-auth";
interface IManualReportForm {
  averageGPA: string;
  weeklySum: {
    weeklySummarySunday: string;
    weeklySummaryMonday: string;
    weeklySummaryTuesday: string;
    weeklySummaryWednesday: string;
    weeklySummaryThursday: string;
    weeklySummaryFriday: string;
    weeklySummarySaturday: string;
  };
  topUniversities: { name: string; percentage: number }[];
  topPrograms: { name: string; percentage: number }[];
  genderSummary: { male: Number; female: Number };
}

export default function ManualReportFormComponent() {
  const auth = useAuth();
  const { t } = useTranslation("manualReport");
  const [csvData, setCsvData] = useState<IManualReportForm | null>(null);

  const initialValues: IManualReportForm = {
    averageGPA: "",
    weeklySum: {
      weeklySummarySunday: "",
      weeklySummaryMonday: "",
      weeklySummaryTuesday: "",
      weeklySummaryWednesday: "",
      weeklySummaryThursday: "",
      weeklySummaryFriday: "",
      weeklySummarySaturday: "",
    },
    topUniversities: [],
    topPrograms: [],
    genderSummary: { male: 0, female: 0 },
  };

  return (
    <div>
      <div className=" rounded-xl bg-nccGray-50 min-w-min p-4">
        <div className="flex flex-col items-center">
          <div className=" text-xl font-bold ">{t("manualReport")}</div>
          <Formik
            initialValues={initialValues}
            validationSchema={yup.object({})}
            onSubmit={async (values, actions) => {
              setCsvData(values);
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
                <div className="grid grid-cols-2 gap-10 p-4">
                  <div className="flex flex-col gap-8">
                    <div>
                      <label className="label">{t("averageGPA")}</label>
                      <Field
                        name="averageGPA"
                        type="text"
                        placeholder="Average GPA"
                        className={`input input-bordered input-primary ${
                          errors.averageGPA && "input-error"
                        }`}
                      />
                      <label className="label-text-alt text-error">
                        {errors.averageGPA &&
                          touched.averageGPA &&
                          errors.averageGPA}
                      </label>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        <label className="label">{t("genderRatio")}</label>
                        <div className="grid grid-cols-2">
                          <label className="label">Male</label>
                          <Field
                            name="genderSummary.male"
                            type="text"
                            placeholder="Male"
                            className={`input input-bordered input-primary ${
                              errors.genderSummary?.male && "input-error"
                            }`}
                          />
                        </div>
                        <div className="grid grid-cols-2">
                          <label className="label">Female</label>
                          <Field
                            name="genderSummary.female"
                            type="text"
                            placeholder="Female"
                            className={`input input-bordered input-primary ${
                              errors.genderSummary?.female && "input-error"
                            }`}
                          />
                        </div>

                        {/* <label className="label-text-alt text-error">
                        {errors.genderSummary &&
                          touched.genderSummary &&
                          errors.genderSummary}
                      </label> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* Sunday */}
                    <label className="label">{t("weeklySummary")}</label>
                    <div className="grid grid-cols-3 ">
                      <label className="label">Sunday</label>
                      <Field
                        name="weeklySum.weeklySummarySunday"
                        type="text"
                        placeholder="Weekly Summary"
                        className={`input input-bordered col-span-2 input-primary ${
                          errors.weeklySum?.weeklySummarySunday && "input-error"
                        }`}
                      />
                      <label className="label-text-alt text-error">
                        {errors.weeklySum?.weeklySummarySunday &&
                          touched.weeklySum?.weeklySummarySunday &&
                          errors.weeklySum?.weeklySummarySunday}
                      </label>
                    </div>
                    {/* Monday */}
                    <div className="grid grid-cols-3">
                      <label className="label">Monday</label>
                      <Field
                        name="weeklySum.weeklySummaryMonday"
                        type="text"
                        placeholder="Weekly Summary"
                        className={`input input-bordered col-span-2 input-primary ${
                          errors.weeklySum?.weeklySummaryMonday && "input-error"
                        }`}
                      />
                      <label className="label-text-alt text-error">
                        {errors.weeklySum?.weeklySummaryMonday &&
                          touched.weeklySum?.weeklySummaryMonday &&
                          errors.weeklySum?.weeklySummaryMonday}
                      </label>
                    </div>
                    {/* Tuesday */}
                    <div className="grid grid-cols-3">
                      <label className="label">Tuesday</label>
                      <Field
                        name="weeklySum.weeklySummaryTuesday"
                        type="text"
                        placeholder="Weekly Summary"
                        className={`input input-bordered col-span-2 input-primary ${
                          errors.weeklySum?.weeklySummaryTuesday &&
                          "input-error"
                        }`}
                      />
                      <label className="label-text-alt text-error">
                        {errors.weeklySum?.weeklySummaryTuesday &&
                          touched.weeklySum?.weeklySummaryTuesday &&
                          errors.weeklySum?.weeklySummaryTuesday}
                      </label>
                    </div>
                    {/* Wednesday */}
                    <div className="grid grid-cols-3">
                      <label className="label">Wednesday</label>
                      <Field
                        name="weeklySum.weeklySummaryWednesday"
                        type="text"
                        placeholder="Weekly Summary"
                        className={`input input-bordered col-span-2 input-primary ${
                          errors.weeklySum?.weeklySummaryWednesday &&
                          "input-error"
                        }`}
                      />
                      <label className="label-text-alt text-error">
                        {errors.weeklySum?.weeklySummaryWednesday &&
                          touched.weeklySum?.weeklySummaryWednesday &&
                          errors.weeklySum?.weeklySummaryWednesday}
                      </label>
                    </div>
                    {/* Thursday */}
                    <div className="grid grid-cols-3">
                      <label className="label">Thursday</label>
                      <Field
                        name="weeklySum.weeklySummaryThursday"
                        type="text"
                        placeholder="Weekly Summary"
                        className={`input input-bordered col-span-2 input-primary ${
                          errors.weeklySum?.weeklySummaryThursday &&
                          "input-error"
                        }`}
                      />
                      <label className="label-text-alt text-error">
                        {errors.weeklySum?.weeklySummaryThursday &&
                          touched.weeklySum?.weeklySummaryThursday &&
                          errors.weeklySum?.weeklySummaryThursday}
                      </label>
                    </div>
                    {/* Friday */}
                    <div className="grid grid-cols-3">
                      <label className="label">Friday</label>
                      <Field
                        name="weeklySum.weeklySummaryFriday"
                        type="text"
                        placeholder="Weekly Summary"
                        className={`input input-bordered col-span-2 input-primary ${
                          errors.weeklySum?.weeklySummaryFriday && "input-error"
                        }`}
                      />
                      <label className="label-text-alt text-error">
                        {errors.weeklySum?.weeklySummaryFriday &&
                          touched.weeklySum?.weeklySummaryFriday &&
                          errors.weeklySum?.weeklySummaryFriday}
                      </label>
                    </div>
                    {/* Saturday */}
                    <div className="grid grid-cols-3">
                      <label className="label">Saturday</label>
                      <Field
                        name="weeklySum.weeklySummarySaturday"
                        type="text"
                        placeholder="Weekly Summary"
                        className={`input input-bordered col-span-2 input-primary ${
                          errors.weeklySum?.weeklySummarySaturday &&
                          "input-error"
                        }`}
                      />
                      <label className="label-text-alt text-error">
                        {errors.weeklySum?.weeklySummarySaturday &&
                          touched.weeklySum?.weeklySummarySaturday &&
                          errors.weeklySum?.weeklySummarySaturday}
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="label">{t("topUniversities")}</label>
                    <FieldArray
                      name="topUniversities"
                      render={(arrayHelpers) => (
                        <div>
                          {values.topUniversities &&
                          values.topUniversities.length > 0 ? (
                            values.topUniversities.map((uni, index) => (
                              <div key={index}>
                                <div className=" p-2 flex gap-2">
                                  <Field
                                    className={`input input-bordered input-primary ${
                                      errors.topUniversities && "input-error"
                                    }`}
                                    name={`topUniversities.${index}.name`}
                                  />
                                  <Field
                                    className={`input input-bordered input-primary !w-20 text-center ${
                                      errors.topUniversities && "input-error"
                                    }`}
                                    name={`topUniversities.${index}.percentage`}
                                  />
                                </div>
                                <button
                                  className=" p-4 font-bold"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  className=" p-4"
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              className="btn btn-accent"
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({ name: "", percentage: "" })
                              }
                            >
                              {/* show this when user has removed all topUniversities from the list */}
                              Add a university
                            </button>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="label">{t("topPrograms")}</label>
                    <FieldArray
                      name="topPrograms"
                      render={(arrayHelpers) => (
                        <div>
                          {values.topPrograms &&
                          values.topPrograms.length > 0 ? (
                            values.topPrograms.map((uni, index) => (
                              <div key={index}>
                                <div className=" p-2 flex gap-2">
                                  <Field
                                    className={`input input-bordered input-primary ${
                                      errors.topPrograms && "input-error"
                                    }`}
                                    name={`topPrograms.${index}.name`}
                                  />
                                  <Field
                                    className={`input input-bordered input-primary !w-20 text-center ${
                                      errors.topPrograms && "input-error"
                                    }`}
                                    name={`topPrograms.${index}.percentage`}
                                  />
                                </div>
                                <button
                                  className=" p-4"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  className=" p-4"
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              className="btn btn-accent"
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({ name: "", percentage: "" })
                              }
                            >
                              {/* show this when user has removed all topPrograms from the list */}
                              Add a program
                            </button>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className=" flex justify-center mt-10">
                  <button
                    type="submit"
                    className={`btn btn-primary text-white w-full ${
                      isSubmitting && "loading"
                    }`}
                    disabled={isSubmitting}
                  >
                    {t("createReport")}
                  </button>
                  {csvData && (
                    <CSVLink
                      filename={`ManualReport-${new Date().toISOString()}.csv`}
                      data={[
                        {
                          averageGPA: csvData.averageGPA,
                        },
                        csvData.weeklySum,
                        // [csvData.topUniversities],
                        // [csvData.topPrograms],
                        csvData.genderSummary,
                      ]}
                      className="text-xs text-white btn btn-primary btn-sm"
                    >
                      {t("exportCSV")}
                    </CSVLink>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
