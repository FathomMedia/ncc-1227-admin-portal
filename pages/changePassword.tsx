import React from "react";
import { Toaster } from "react-hot-toast";
import ChangePasswordFormComponent from "../components/change-password-form-component";

export default function ChangePassword() {
  return (
    <div className=" h-screen flex justify-center items-center">
      <Toaster />
      <ChangePasswordFormComponent></ChangePasswordFormComponent>
    </div>
  );
}
