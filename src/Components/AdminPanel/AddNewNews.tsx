import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { SmartInput } from "../SmartComponents/SmartInput";
import { AddNewsDocument } from "../../generated/graphql";
import { useMutation } from "@apollo/client";
import { useNewsContext } from "@/context/NewsContext";

interface AddNewNewsProps {
  title: string;
  content: string;
  date: Date;
  author: string;
}

const schema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  date: yup.date().required(),
  author: yup.string().required(),
});

export const AddNewNews = () => {
  const [addNews] = useMutation(AddNewsDocument);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { setHasUnreadNews } = useNewsContext();

  const methods = useForm<AddNewNewsProps>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: AddNewNewsProps) => {
    try {
      const response = await addNews({
        variables: {
          title: data.title,
          content: data.content,
          date: data.date,
          author: data.author,
        },
      });

      methods.reset();
      setHasUnreadNews(true);
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };
  return (
    <>
      <div className="flex flex-col items-center w-full p-4">
        <button
          onClick={handleButtonClick}
          className="bg-gray-300 dark:bg-gray-800 px-4 py-2 rounded-t-lg "
        >
          Add new News
        </button>
        {isFormVisible && (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded-md shadow-md "
            >
              <SmartInput name="title" type="text" label="Title" />
              <div className="flex flex-col w-full">
                <label htmlFor="content" className="mb-1">
                  Content
                </label>
                <textarea
                  className="flex-1 border-2 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 mb-4"
                  {...methods.register("content")}
                ></textarea>
              </div>
              <SmartInput name="date" type="date" label="date" />
              <SmartInput name="author" type="text" label="author" />
              <div className="flex justify-center mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Add
                </button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </>
  );
};
