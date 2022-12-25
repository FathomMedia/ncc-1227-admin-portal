import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { PageComponent } from "../../../components/page-component";

export default function UniversityInfo() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <PageComponent title={"UniversityInfo"}>
        <div>{id}</div>
      </PageComponent>
    </div>
  );
}
