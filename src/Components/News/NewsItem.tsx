import React from "react";
interface NewsItemProps {
  date: string;
  title: string;
  description: string;
  author: string;
}
export const NewsItem = ({
  date,
  title,
  description,
  author,
}: NewsItemProps) => {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={date} className="">
          {date}
        </time>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 ">
          <span className="absolute inset-0" />
          {title}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 ">{description}</p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <div className="text-sm leading-6">
          <p className="font-semibold ">
            <span className="absolute inset-0" />
            {author}
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200 w-full "></div>
    </article>
  );
};
