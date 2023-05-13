import React from "react";
import { useSignInEmailPassword } from "@nhost/react";
import { SmartInput } from "../SmartComponents/SmartInput";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useInsertUserLastVisitMutation,
  useUpdateUserLastVisitMutation,
} from "@/generated/graphql";
import { NavForNotLoggedIn } from "../NavForNotLoggedIn/NavForNotLoggedIn";
const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

interface SignInFormProps {
  email: string;
  password: string;
}
export const SignIn = () => {
  const [insertUserLastVisit] = useInsertUserLastVisitMutation();
  const [updateUserLastVisit] = useUpdateUserLastVisitMutation();
  const methods = useForm<SignInFormProps>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: SignInFormProps) => {
    try {
      const result = await signInEmailPassword(data.email, data.password);
      if (result && result.user) {
        const userId = result.user.id;
        const lastVisitDate = new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000
        ).toISOString();

        const { data: updateData } = await updateUserLastVisit({
          variables: { userId: userId, lastVisitDate: lastVisitDate },
        });

        if (
          !updateData ||
          !updateData.update_user_last_visits ||
          updateData.update_user_last_visits.affected_rows === 0
        ) {
          await insertUserLastVisit({
            variables: { userId: userId, lastVisitDate: lastVisitDate },
          });
        }
      }
    } catch (error) {
      console.error("Logowanie nie powiodło się", error);
    }
  };

  const { signInEmailPassword, isSuccess, isError, error } =
    useSignInEmailPassword();

  if (isSuccess) {
  }

  return (
    <div>
      <div>
        <NavForNotLoggedIn />
      </div>
      <div className="flex h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-[url('../../public/images/Logo.5.png')] w-52 h-52 bg-contain bg-no-repeat mt-8 mx-auto"></div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="">
              <div className="-space-y-px rounded-md shadow-sm flex flex-col gap-2 px-10">
                <SmartInput name="email" type="email" autoComplete="email" />
                <SmartInput
                  name="password"
                  type="password"
                  autoComplete="password"
                />
                {isError && (
                  <span className="text-center text-red-700">
                    {error?.message}
                  </span>
                )}

                <button
                  type="submit"
                  className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Anmelden
                </button>
              </div>

              <div></div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
