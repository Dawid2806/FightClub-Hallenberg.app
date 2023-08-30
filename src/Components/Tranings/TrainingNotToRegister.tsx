import React from "react";
interface TrainingNotToRegisterProps {
  title: string;
}
export const TrainingNotToRegister = ({
  title,
}: TrainingNotToRegisterProps) => {
  return (
    <div>
      <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
      <div className="absolute  flex flex-col whitespace-nowrap top-1/2 left-1/2 text-white transform -translate-x-1/2 -translate-y-1/2 p-4 bg-red-700 z-20 font-bold rounded-2xl">
        <p className=" uppercase text-xs md:text-sm ">{title}</p>
      </div>
    </div>
  );
};
