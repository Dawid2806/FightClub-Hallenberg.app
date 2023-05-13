import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
export const NavForNotLoggedIn = () => {
  return (
    <nav className=" bg-gray-800  flex justify-center  text-gray-300 py-4 ">
      <ul>
        <li className="flex items-center gap-4">
          <HomeIcon width={"40px"} height={"40px"} />
          <Link className="text-2xl" href="https://fightclub-hallenberg.de/">
            Unsere website
          </Link>
        </li>
      </ul>
    </nav>
  );
};
