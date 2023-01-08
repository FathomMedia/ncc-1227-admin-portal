import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { PageComponent } from "../../../components/page-component";
import { GetServerSideProps } from "next";
import { getUniversityByID } from "../../../src/CustomAPI";
import { University } from "../../../src/API";
import { Program } from "../../../src/models";

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

        <div>
          <div className=" w-[400px] flex justify-between items-center">
            <div>Name</div>
            <div>
              <input
                type="text"
                className=" border rounded-xl"
                title="uni-name"
                value={`${getUni?.name}`}
              />
            </div>
          </div>

          <div className=" w-[400px] flex justify-between items-center">
            <div>Deactivate?</div>
            <div>
              <input
                type="checkbox"
                className=" checkbox "
                title="uni-deactivated"
                checked={getUni?.isDeactivated ? true : false}
              />
            </div>
            <div></div>
          </div>

          <div className=" mb-4">Programs</div>
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getUni?.Programs?.items.map((program) => {
                    return (
                      <tr key={program?.id}>
                        <td>{program?.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PageComponent>
    </div>
  );
}
