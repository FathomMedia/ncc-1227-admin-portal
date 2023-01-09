import { Formik, Form, Field } from "formik";
import React, { FC } from "react";

import * as yup from "yup";
import { IDateRange } from "../src/Helpers";

interface Props {
  dateRange: IDateRange;
  updateRange: (range: IDateRange) => void;
}

export const DateRangeComponent: FC<Props> = ({ dateRange, updateRange }) => {
  let initialValues: IDateRange = dateRange;

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          start: yup.date().required(),
          end: yup.date().required(),
        })}
        onSubmit={async (values, actions) => {
          console.log(values);
          updateRange({
            start: values.start,
            end: values.end,
          });

          actions.setSubmitting(false);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className="flex items-center justify-center gap-3 w-min input input-bordered">
            <Field
              className={`input input-xs input-ghost text-gray-600`}
              name="start"
              type="date"
              placeholder="Start Date"
              value={values.start}
              onChange={handleChange}
            />
            <p className="text-gray-400 min-w-fit">{"→"}</p>
            <Field
              className={`input input-xs input-ghost text-gray-600`}
              name="end"
              type="date"
              placeholder="End Date"
              value={values.end}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-sm btn-ghost"
              disabled={
                isSubmitting ||
                (dateRange.start === values.start &&
                  dateRange.end === values.end)
              }
            >
              Apply
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
