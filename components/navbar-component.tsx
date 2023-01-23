import React from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import {
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import NavBarButton from "./navbar-button";
import Image from "next/image";
import { useAuth } from "../hooks/use-auth";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "./langSwitcher";

export default function NavbarComponent() {
  const { signOut, isSignedIn } = useAuth();
  const { t } = useTranslation("pageTitles");

  return (
    <div className="flex flex-col justify-between p-4 py-24 bg-nccGray-50">
      <div className="flex flex-col gap-4">
        <div className=" max-w-[200px]">
          <Image
            className=""
            src="/logo.svg"
            alt="logo"
            width={200}
            height={100}
          />
        </div>
        <div className="max-w-[200px] flex justify-center">
          <LangSwitcher></LangSwitcher>
        </div>
        <NavBarButton
          name={t("Dashboard")}
          icon={
            <AiOutlineAppstore className="w-5 h-5 stroke-gray hover:stroke-anzac-500 hover:cursor-pointer" />
          }
          linkTo={"/"}
        ></NavBarButton>
        <NavBarButton
          name={t("Applications")}
          icon={
            <HiOutlineBriefcase className="w-5 h-5 stroke-gray hover:stroke-anzac-500 hover:cursor-pointer" />
          }
          linkTo={"/applications"}
        ></NavBarButton>
        <NavBarButton
          name={t("Education")}
          icon={
            <BsBook className="w-5 h-5 stroke-gray hover:stroke-anzac-500 hover:cursor-pointer" />
          }
          linkTo={"/education"}
        ></NavBarButton>
        <NavBarButton
          name={t("Users")}
          icon={
            <HiOutlineUsers className="w-5 h-5 stroke-gray hover:stroke-anzac-500 hover:cursor-pointer" />
          }
          linkTo={"/users"}
        ></NavBarButton>
        <NavBarButton
          name={t("Logs")}
          icon={
            <HiOutlineClipboardList className="w-5 h-5 stroke-gray hover:stroke-anzac-500 hover:cursor-pointer" />
          }
          linkTo={"/adminLogs"}
        ></NavBarButton>
        <NavBarButton
          name={t("Support")}
          icon={
            <HiOutlineChatAlt2 className="w-5 h-5 stroke-gray hover:stroke-anzac-500 hover:cursor-pointer" />
          }
          linkTo={"https://app.crisp.chat/"}
          target={"_blank"}
        ></NavBarButton>
      </div>

      {!isSignedIn ? (
        <></>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-start px-4 py-2 text-sm w-52 text-gray rounded-xl hover:cursor-pointer">
            <Image
              src={"/logout_icon.svg"}
              alt={"Log out icon"}
              width={20}
              height={20}
            />
            <button className="ltr:pl-4 rtl:pr-4" onClick={signOut}>
              {t("signOut")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
