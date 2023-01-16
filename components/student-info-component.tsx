import React from "react";
import { useTranslation } from "react-i18next";
import { Student } from "../src/API";

interface Props {
  student: Student | null | undefined;
}

//View student info - student name, cpr and email address
export default function StudentInfoComponent({ student }: Props) {
  const { t } = useTranslation("applications");
  return (
    <div>
      <table className="table w-full mb-4 table-fixed">
        <thead>
          <tr>
            <th>{t("studentField")}</th>
            <th>{t("value")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t("fullName")}</td>
            <td>{student?.fullName}</td>
          </tr>
          <tr>
            <td>{t("cpr")}</td>
            <td>{student?.cpr}</td>
          </tr>
          <tr>
            <td>{t("emailAddress")}</td>
            <td>{student?.email}</td>
          </tr>
          <tr>
            <td>{t("phoneNumber")}</td>
            <td>{student?.phone}</td>
          </tr>
          <tr>
            <td>{t("address")}</td>
            <td className=" overflow-x-scroll">{student?.address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
