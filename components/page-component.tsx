import { FC, PropsWithChildren, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../hooks/use-auth";
import NavbarComponent from "./navbar-component";
import SignInFormComponent from "./sign-in-form-component";

import Image from "next/image";
import { LangSwitcher } from "./langSwitcher";

interface Props {
  title: string;
}

export const PageComponent: FC<PropsWithChildren<Props>> = (props) => {
  const { isSignedIn, user } = useAuth();

  return (
    <div>
      <Toaster />

      <div className="fixed top-0 left-0 z-50 shadow-lg navbar lg:hidden bg-nccGray-50 shadow-black/5">
        <div className="flex-none">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button rounded-xl lg:hidden"
          >
            <GiHamburgerMenu className=" fill-white" />
          </label>
        </div>
        <div className="flex-1">
          <Image src="/logo.svg" alt="logo" width={200} height={100} />
        </div>
      </div>
      <div className="drawer drawer-mobile min-w-[277px]">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          title="pageComponent"
        />

        <div className="m-4 drawer-content">
          {!isSignedIn ? (
            <SignInFormComponent></SignInFormComponent>
          ) : (
            user?.challengeName !== "NEW_PASSWORD_REQUIRED" && (
              <div>
                <div className="container px-6 mx-auto mt-24 md:px-10 lg:px-16 ">
                  {props.children}
                </div>
              </div>
            )
          )}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <NavbarComponent></NavbarComponent>
        </div>
      </div>
    </div>
  );
};
