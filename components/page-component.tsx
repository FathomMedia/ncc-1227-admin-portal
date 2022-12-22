import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../hooks/use-auth";
import NavbarComponent from "./navbar-component";
import SignInFormComponent from "./sign-in-form-component";

interface Props {
  title: string;
}

export const PageComponent: FC<PropsWithChildren<Props>> = (props) => {
  const { isSignedIn, user } = useAuth();
  return (
    <div>
      <Toaster />

      <div className="drawer drawer-mobile min-w-[277px]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <GiHamburgerMenu />
          </label>
          {!isSignedIn ? (
            <SignInFormComponent></SignInFormComponent>
          ) : (
            user?.challengeName !== "NEW_PASSWORD_REQUIRED" && (
              <div>
                <div className=" mx-16 mt-24">{props.children}</div>
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
