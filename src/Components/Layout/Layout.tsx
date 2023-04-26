import React, { ReactNode } from "react";
import { Nav } from "./Nav/Nav";
import { Footer } from "./Footer/Footer";
import { useAuthenticationStatus } from "@nhost/nextjs";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black">
          <div className="text-gray-800  dark:text-gray-300 ">
            <Nav />
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">{children}</div>
      )}
    </>
  );
};
