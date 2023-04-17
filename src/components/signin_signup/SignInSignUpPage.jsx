import React from "react";
import SignInPageCover from "./SignInPageCover";
import SignInSignUpForm from "./SignInSignUpForm";

export default function SignInSignUpPage() {
  return (
    <div
      className="d-flex flex-wrap flex-sm-colum justify-content-evenly align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="p-2 ">
        <>
          <SignInPageCover />
        </>
      </div>
      <div className="p-2">
        <>
          <SignInSignUpForm />
        </>
      </div>
    </div>
  );
}
