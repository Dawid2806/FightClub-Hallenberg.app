import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuthenticationStatus } from "@nhost/react";
import { ThemeSwitcher } from "../../ThemeSwitcher/ThemeSwitcher";
import { SignOut } from "@/Components/SignOut/SignOut";
import { useUserData } from "@nhost/nextjs";
import Link from "next/link";
import {
  useGetAllNewsWithoutPaginationQuery,
  useGetUserLastVisitQuery,
} from "@/generated/graphql";
import { useEffect } from "react";
import { useNewsContext } from "@/context/NewsContext";

export const Nav = () => {
  const { hasUnreadNews, setHasUnreadNews } = useNewsContext();
  const { isAuthenticated } = useAuthenticationStatus();
  const user = useUserData();
  const { data: userLastVisitData } = useGetUserLastVisitQuery({
    variables: { user_id: user?.id! },
    skip: !user,
  });
  const { data: newsData } = useGetAllNewsWithoutPaginationQuery({
    pollInterval: 6000,
  });

  useEffect(() => {
    if (userLastVisitData && newsData) {
      if (userLastVisitData.user_last_visits.length > 0) {
        const lastVisit = userLastVisitData.user_last_visits[0].last_visit;
        const hasUnread = newsData.news.some(
          (newsItem) => newsItem.createdAt > lastVisit
        );
        setHasUnreadNews(hasUnread);
      } else {
        setHasUnreadNews(newsData.news.length > 0);
      }
    }
  }, [userLastVisitData, newsData, setHasUnreadNews]);

  const styleMenuWithMobileNav = " w-2/12  py-2 rounded-md text-base px-2  ";
  const styleMenuDesktop = " px-3 py-2 cursor-pointer font-medium";
  return (
    <Disclosure as="nav" className="bg-gray-800 text-gray-300 dark:bg-black ">
      {({ open, close }) => (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2  ">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex ">
                  <Link className={styleMenuDesktop} href="/">
                    Home
                  </Link>

                  <Link href="/profile" className={styleMenuDesktop}>
                    Profil
                  </Link>

                  <Link href="/news" className={styleMenuDesktop}>
                    News{" "}
                    {hasUnreadNews && (
                      <span className="text-red-500 animate-pulse bg-white px-2 rounded-full">
                        !
                      </span>
                    )}
                  </Link>
                  <div className="bg-[url('../../public/images/Logo.5.png')] dark:bg-[url('../../public/images/Logo.6.png')] w-10 h-10 bg-contain bg-no-repeat ml-10 "></div>

                  {user?.roles.find((role) => role === "admin") && (
                    <Link href="/admin" className={styleMenuDesktop}>
                      Admin Panel
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <ThemeSwitcher />
              {isAuthenticated && <SignOut />}
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="flex  flex-col space-y-1 px-2 pt-2 pb-3">
              <Link
                href={"/"}
                className={styleMenuWithMobileNav}
                onClick={() => close()}
              >
                Home
              </Link>

              <Link
                href={"/profile"}
                className={styleMenuWithMobileNav}
                onClick={() => close()}
              >
                Profil
              </Link>

              <Link
                href="/news"
                className={styleMenuWithMobileNav}
                onClick={() => close()}
              >
                News
                {hasUnreadNews && (
                  <span className="text-red-500 animate-pulse">!</span>
                )}
              </Link>
              {user?.roles.find((role) => role === "admin") && (
                <Link
                  href="/admin"
                  className={styleMenuWithMobileNav}
                  onClick={() => close()}
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
