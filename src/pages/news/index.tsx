import { NewsList } from "@/Components/News/NewsList";
import withAuth from "@/Components/withAuth/withAuth";

import React, { useEffect } from "react";
import { useNewsContext } from "@/context/NewsContext";
import { useRouter } from "next/router";
import Head from "next/head";

const NewsPage = () => {
  const { setHasUnreadNews } = useNewsContext();
  const router = useRouter();

  useEffect(() => {
    setHasUnreadNews(false);
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <NewsList />
    </>
  );
};
export default withAuth(NewsPage);
