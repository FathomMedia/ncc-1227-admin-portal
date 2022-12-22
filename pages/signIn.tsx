import React from "react";
import { Toaster } from "react-hot-toast";
import { PageComponent } from "../components/page-component";
import SignInFormComponent from "../components/sign-in-form-component";

export default function SignInPage() {
  return (
    <PageComponent title={"Sign In"}>
      <Toaster />
      <SignInFormComponent></SignInFormComponent>
    </PageComponent>
  );
}
