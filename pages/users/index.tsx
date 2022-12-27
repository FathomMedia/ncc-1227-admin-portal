import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { PageComponent } from "../../components/page-component";
import PrimaryButton from "../../components/primary-button";
import SearchBarComponent from "../../components/search-bar-component";
import SecondaryButton from "../../components/secondary-button";
import UsersCardInfo from "../../components/users-card-info";
import { useAppContext } from "../../context/AppContext";
import { useRouter } from "next/navigation";
import { Admin } from "../../src/API";

export default function Users() {
  const admins = useAppContext();

  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [resultList, setResultList] = useState<Admin[]>([]);

  useEffect(() => {
    let temp = admins.admins?.listAdmins?.items as Admin[];
    setResultList(temp);
    setAdminList(temp);
    return () => {};
  }, [admins]);

  function resetList() {
    setResultList(adminList);
  }

  //search for admin user
  function search() {
    let searchResult = adminList?.filter(
      (value) =>
        value?.fullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
        value?.cpr?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setResultList(searchResult);

    console.log("Searching: ", searchResult);
  }

  return (
    <PageComponent title={"Users"}>
      <div className="">
        <div className=" mb-4">
          <div className=" mb-6">
            <div className=" text-2xl font-semibold">Administrators</div>
            <div className=" text-base font-medium text-gray-500">
              View a list of users.
            </div>
          </div>

          {/* administrators search bar */}
          <div className=" border rounded-xl border-nccGray-50 bg-nccGray-50 flex justify-between p-6 gap-4">
            <div className=" w-full">
              <SearchBarComponent
                searchChange={(value) => {
                  setSearchValue(value);

                  if (value === "") {
                    resetList();
                  }
                }}
                onSubmit={(value: string) => {
                  setSearchValue(value);
                  search();
                }}
              />
            </div>
            <div className=" flex gap-4">
              <PrimaryButton
                name={"Search"}
                buttonClick={search}
              ></PrimaryButton>
              <SecondaryButton
                name={"+ Add User"}
                buttonClick={() => router.push("/users/addUsers")}
              ></SecondaryButton>
            </div>
          </div>
        </div>

        {/* grid table of users*/}
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-y-4 gap-x-3">
          {resultList?.map((admin) => (
            <UsersCardInfo
              key={admin?.cpr}
              fullName={`${admin?.fullName}`}
              userName={`${admin?.cpr}`}
            ></UsersCardInfo>
          ))}
        </div>
      </div>
    </PageComponent>
  );
}
