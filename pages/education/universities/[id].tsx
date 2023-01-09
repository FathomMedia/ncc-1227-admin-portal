import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { PageComponent } from "../../../components/page-component";
import { GetServerSideProps } from "next";
import { getUniversityByID } from "../../../src/CustomAPI";
import { University } from "../../../src/API";
import { Program } from "../../../src/models";
import UniversityFormComponent from "../../../components/university-form-component";

interface Props {
  getUni: University | undefined;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const getUni = await getUniversityByID(`${id}`);
  return {
    props: {
      getUni,
    },
  };
};

export default function UniversityInfo({ getUni }: Props) {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <PageComponent title={"UniversityInfo"}>
        <Toaster />
        <div className="mb-8 ">
          <div className="text-2xl font-semibold ">University</div>
          <div className="text-base font-medium text-gray-500 ">ID - {id}</div>
        </div>

        <UniversityFormComponent university={getUni}></UniversityFormComponent>
      </PageComponent>
    </div>
  );
}
