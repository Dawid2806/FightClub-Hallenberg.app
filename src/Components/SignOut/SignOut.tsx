import React from "react";
import { useSignOut } from "@nhost/react";

export const SignOut = () => {
  const { signOut } = useSignOut();
  const signOutHandler = () => {
    signOut();
    const bodyClass = window.document.body.classList;
    bodyClass.remove("dark");
  };
  return (
    <button
      className="text-gray-300  rounded-md text-base mx-2 "
      onClick={signOutHandler}
    >
      Auslogen
    </button>
  );
};
