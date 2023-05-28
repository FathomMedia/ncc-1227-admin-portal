import React from "react";
import { useTranslation } from "react-i18next";
import { Student } from "../src/API";
import GetStorageLinkComponent from "./get-storage-link-component";

interface Props {
  student: Student | null | undefined;
}

//View student info - student name, cpr and email address
export default function StudentInfoComponent({ student }: Props) {
  const { t } = useTranslation("applications");
  return (
    <div dir="ltr">
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
            <td className="overflow-x-scroll ">{student?.address}</td>
          </tr>
          <tr>
            <td>{t("familyIncome")}</td>
            <td className="overflow-x-scroll ">{student?.familyIncome}</td>
          </tr>
          <tr>
            <td>{t("familyIncomeProof")}</td>
            <td>
              <div className="flex flex-col p-3 rounded-lg bg-zinc-100">
                <div className="flex flex-wrap items-center gap-2">
                  {student?.familyIncomeProofDocs?.map((doc, index) => (
                    <div key={index} className="">
                      <GetStorageLinkComponent
                        storageKey={doc}
                        showName
                      ></GetStorageLinkComponent>
                    </div>
                  ))}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
