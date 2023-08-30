import { useUserData } from "@nhost/react";
import { useHandleRegister } from "./useHandleRegister";
import Link from "next/link";
import { TrainingNotToRegister } from "./TrainingNotToRegister";

interface TraningItemProps {
  id: string;
  title: string;
  places: number;
  maxPlaces: number;
  time: string;
  day: string;
}

export const TraningItem = ({
  time,
  title,
  maxPlaces,
  places,
  id,
  day,
}: TraningItemProps) => {
  const user = useUserData();

  const daysWeek = [
    "montag",
    "dienstag",
    "mittwoch",
    "donnerstag",
    "freitag",
    "samstag",
    "sonntag",
  ];
  const dayWeek = daysWeek.indexOf(day);
  console.log(dayWeek);
  let today = new Date().getDay() - 1;

  const { AddUserToTraining, RemoveUserFromTraining, isCurrentUserInTraining } =
    useHandleRegister({ id, user, maxPlaces, places });

  const isPastDay = dayWeek < today;

  const isLessThan10HoursBeforeTraining = (
    trainingTime: string,
    trainingDayWeek: number
  ) => {
    const now = new Date();

    const trainingDate = new Date();
    const [hours, minutes] = trainingTime.split(":").map(Number);
    trainingDate.setHours(hours, minutes, 0, 0);

    const currentDayOfWeek = now.getDay();

    trainingDayWeek = trainingDayWeek === 0 ? 6 : trainingDayWeek + 1;

    if (currentDayOfWeek === trainingDayWeek) {
      trainingDate.setDate(now.getDate());
    } else if (currentDayOfWeek < trainingDayWeek) {
      const daysToAdd = trainingDayWeek - currentDayOfWeek;
      trainingDate.setDate(now.getDate() + daysToAdd);
    } else {
      return false;
    }

    const differenceInMilliseconds = trainingDate.getTime() - now.getTime();
    const timeBeforeTraining = 90 * 60 * 1000;

    return differenceInMilliseconds <= timeBeforeTraining;
  };
  const isRegistrationBlocked = isLessThan10HoursBeforeTraining(time, dayWeek);
  console.log(isRegistrationBlocked);
  return (
    <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 text-gray-800 dark:text-gray-200">
      {isCurrentUserInTraining && (
        <>
          <div className="absolute  inset-0 w-full h-full bg-black opacity-50"></div>
          <button
            onClick={RemoveUserFromTraining}
            className="absolute top-1/2 left-1/2 text-white transform -translate-x-1/2 -translate-y-1/2 py-4  px-6 uppercase bg-red-700 z-20 font-bold rounded-2xl"
          >
            von Traning abmelden
          </button>
        </>
      )}
      {isPastDay && (
        <>
          <TrainingNotToRegister title="Training beendet" />
        </>
      )}
      {!isCurrentUserInTraining &&
        places === maxPlaces &&
        !user?.roles.includes("admin") && (
          <>
            <TrainingNotToRegister title="Alle platze beleg" />
          </>
        )}
      {isRegistrationBlocked && (
        <>
          <TrainingNotToRegister title="Anmeldung geschlossen" />
        </>
      )}
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex m-auto  justify-center sm:gap-4">
        <div>
          <h3 className="text-lg font-bold uppercase  sm:text-xl">{title}</h3>
        </div>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-xs  ">Zeit</dt>
          <dd className="text-sm  font-medium">{time.slice(0, -3)}</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-xs ">Dauer</dt>
          <dd className="text-sm font-medium">
            {title === "Offene Matte" ? "3h" : "1h 15min"}
          </dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-xs ">Plätze</dt>
          <dd className="text-sm font-medium">
            {places}/{maxPlaces}
          </dd>
        </div>
      </dl>
      <div className="flex flex-col">
        {user?.roles.find((role) => role === "admin") ? (
          <Link
            className="underline   px-4 py-2 whitespace-nowrap rounded-xl "
            href={`/${id}`}
          >
            Info
          </Link>
        ) : (
          <>
            <button
              onClick={AddUserToTraining}
              className="py-2 px-4 whitespace-nowrap my-5 text-white   bg-green-600  font-bold rounded-2xl"
            >
              Ich mache mit!
            </button>
          </>
        )}
      </div>
    </div>
  );
};
