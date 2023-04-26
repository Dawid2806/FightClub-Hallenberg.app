import { useGetAllNewsQuery } from "@/generated/graphql";
import React, { useEffect } from "react";
import { NewsItem } from "./NewsItem";
import { useNewsContext } from "@/context/NewsContext";
import { Spinner } from "../Spinner/Spinner";

const NEWS_PER_PAGE = 3;

export const NewsList = () => {
  const { setHasUnreadNews } = useNewsContext();
  const { data, fetchMore } = useGetAllNewsQuery({
    variables: {
      limit: NEWS_PER_PAGE,
      offset: 0,
    },
    pollInterval: 60000,
  });
  useEffect(() => {
    setHasUnreadNews(false);
  }, []);
  if (!data) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const loadMore = async () => {
    const currentNewsCount = data?.news.length || 0;
    await fetchMore({
      variables: {
        offset: currentNewsCount,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          news: [...prev.news, ...fetchMoreResult.news],
        };
      },
    });
  };

  return (
    <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            Unsere News !
          </h2>
          <p className="mt-2 text-lg leading-8 ">
            Denken Sie daran, Unsere Nachrichten regelmäßig zu kontrollieren{" "}
          </p>
        </div>
        <div className="mx-auto  grid max-w-2xl grid-cols-1  gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data?.news.map((news) => {
            return (
              <NewsItem
                key={news.id}
                author={news.author}
                date={news.date}
                description={news.content}
                title={news.title}
              />
            );
          })}
        </div>
        <div className="flex justify-center mt-10">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
