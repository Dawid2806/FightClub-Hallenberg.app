import { AddNewNews } from "@/Components/AdminPanel/AddNewNews";
import withAdminAuth from "@/Components/withAuth/withAdminAuth";
import { useUserData } from "@nhost/nextjs";
import Head from "next/head";

import React from "react";

const AdminPage = () => {
  const user = useUserData();
  const isAdmin = user?.roles.some((role) => role === "admin");
  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>
      {isAdmin && (
        <main>
          <AddNewNews />
        </main>
      )}
    </>
  );
};

export default withAdminAuth(AdminPage);
