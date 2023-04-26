import React from "react";
import withAuth from "../../Components/withAuth/withAuth";
import { ProfileForm } from "@/Components/ProfileForm/ProfileForm";
import Head from "next/head";

const ProfilPage = () => {
  return (
    <div className="text-black dark:text-gray-300">
      <Head>
        <title>Dein Profile</title>
      </Head>
      <ProfileForm />
    </div>
  );
};
export default withAuth(ProfilPage);
