import React from "react";
import { useSignOut } from "@nhost/react";
import { useRouter } from "next/router";
export const SignOut = () => {
  const { signOut } = useSignOut();
  const router = useRouter();
  const signOutHandler = () => {
    signOut();
    const bodyClass = window.document.body.classList;
    bodyClass.remove("dark");
    router.push("/");
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
