import { SignIn } from "@/Components/SignIn/SignIn";
import { TrainingList } from "@/Components/Tranings/TraningsList";
import { useUserData } from "@nhost/nextjs";
import { useAuthenticationStatus } from "@nhost/react";
import Head from "next/head";

export default function Home() {
  const user = useUserData();

  const { isAuthenticated } = useAuthenticationStatus();
  return (
    <div className="bg-white dark:bg-black">
      <Head>
        <title>FightClub-Hallenberg APP</title>
      </Head>
      {isAuthenticated && (
        <main>
          <div>
            <div>
              <div className="bg-[url('../../public/images/Logo.5.png')] dark:bg-[url('../../public/images/Logo.6.png')] w-52 h-52 bg-contain bg-no-repeat mt-8 mx-auto"></div>
              <h1 className="text-center mb-10 text-2xl ">
                Wilkommen{" "}
                <span className="font-bold"> {user?.displayName}</span>
              </h1>
            </div>
          </div>
          <TrainingList />
        </main>
      )}
      {!isAuthenticated && <SignIn />}
    </div>
  );
}
