import React from "react";
import { SmartInput } from "../SmartComponents/SmartInput";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useChangePassword } from "@nhost/nextjs";
const schema = yup
  .object({
    newPassword: yup.string().min(9).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  })
  .required();
interface PasswordProps {
  newPassword: string;
  confirmPassword: string;
}
export const ProfileForm = () => {
  const { changePassword, isSuccess, isError, error } = useChangePassword();
  const methods = useForm<PasswordProps>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: PasswordProps) => {
    if (data.newPassword === data.confirmPassword) {
      await changePassword(data.confirmPassword);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center p-16">
          <div className="">
            <h2 className="text-base font-semibold leading-7 ">Profile</h2>
            <p className="mt-1 text-sm leading-6 ">Ändere dein Passwort!</p>

            <SmartInput
              name="newPassword"
              label="Neue password"
              type="password"
            />
            <SmartInput
              name="confirmPassword"
              label="Wiederholen Neue password"
              type="password"
            />
            <button className="mt-6 py-2 px-4 bg-green-400 text-white  rounded-xl font-bold  ">
              Ändern
            </button>
            {isSuccess && (
              <div className="text-green-400 my-5">
                Glückwunsch, Passwort geändert{" "}
              </div>
            )}
            {isError && error?.message}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
