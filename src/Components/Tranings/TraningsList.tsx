import { useQuery } from "@apollo/client";
import { TraningItem } from "./TrainingItem";
import {
  GetAllTraningsDocument,
  GetAllTraningsQuery,
} from "../../generated/graphql";
import { NotFoundTranings } from "./NotFoundTranings";
import { Spinner } from "../Spinner/Spinner";
import { useState } from "react";
import { useUserData } from "@nhost/nextjs";

const orderedDaysOfWeek = [
  "montag",
  "dienstag",
  "mittwoch",
  "donnerstag",
  "freitag",
  "samstag",
  "sonntag",
];

const getCurrentTrainingPeriod = () => {
  const startDate = new Date(2023, 6, 19);
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const now = new Date();
  const timeSinceStart = now.getTime() - startDate.getTime();
  const weekIndex = Math.floor(timeSinceStart / oneWeek);

  return (weekIndex + 1) % 3 === 0;
};

const filterTrainingsByRole = (
  trainings: GetAllTraningsQuery["Trainings"],
  genderRoles: string[],
  subscriptions: string[],
  showMorningTrainings: boolean
) => {
  const isAdmin = genderRoles.includes("admin");

  return trainings.filter((training) => {
    if (training.isMorning !== showMorningTrainings) {
      return false;
    }

    const genderMatch = genderRoles.includes(training.role);
    const subscriptionMatch = subscriptions.includes(training.subscirption);
    const ladyTrainingForFrau =
      genderRoles.includes("frau") && training.subscirption === "ladytraining";
    const mmaOrThaiBoxingForFrau =
      genderRoles.includes("frau") &&
      (training.subscirption === "mma" ||
        training.subscirption === "thaiboxen") &&
      (subscriptions.includes("mma") || subscriptions.includes("thaiboxen"));

    const displayForAdmin =
      isAdmin &&
      (genderMatch ||
        subscriptionMatch ||
        ladyTrainingForFrau ||
        mmaOrThaiBoxingForFrau);

    return (
      displayForAdmin ||
      (genderMatch && subscriptionMatch) ||
      ladyTrainingForFrau ||
      mmaOrThaiBoxingForFrau
    );
  });
};

const groupTrainingsByDay = (
  trainings: GetAllTraningsQuery["Trainings"]
): Map<string, GetAllTraningsQuery["Trainings"][0][]> => {
  const groupedTrainings = new Map();
  trainings.forEach((training) => {
    const dayOfWeek = training.dayofWeek;
    if (!groupedTrainings.has(dayOfWeek)) {
      groupedTrainings.set(dayOfWeek, []);
    }
    groupedTrainings.get(dayOfWeek).push(training);
  });
  return groupedTrainings;
};
export const TrainingList = () => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const user = useUserData();
  const { loading, error, data } = useQuery<GetAllTraningsQuery>(
    GetAllTraningsDocument,
    {
      pollInterval: 3000,
    }
  );

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (!data || data.Trainings.length === 0 || error)
    return (
      <div>
        {" "}
        <NotFoundTranings />
      </div>
    );

  const allRoles = user?.roles!;
  const genderRoles = allRoles.filter((role) =>
    ["kind", "frau", "man", "all"].includes(role)
  );
  const subscriptions = allRoles.filter((role) =>
    ["mma", "thaiboxen", "ladytraining", "kindertraining", "all"].includes(role)
  );

  const filteredTrainings = filterTrainingsByRole(
    data.Trainings,
    genderRoles,
    subscriptions,
    getCurrentTrainingPeriod()
  );

  const groupedTrainings = groupTrainingsByDay(filteredTrainings);
  return (
    <div className="flex flex-col text-center">
      {orderedDaysOfWeek.map((dayOfWeek) => {
        const trainings = groupedTrainings.get(dayOfWeek);
        if (!trainings) return null;
        return (
          <div key={dayOfWeek} className="my-4">
            <span
              className="text-xl font-semibold mb-4 cursor-pointer"
              onClick={() => {
                setExpandedDay(expandedDay === dayOfWeek ? null : dayOfWeek);
              }}
            >
              {dayOfWeek.toUpperCase()}
            </span>
            {expandedDay === dayOfWeek && (
              <div className="flex flex-col md:flex-row flex-wrap gap-6 px-6 my-4 justify-center items-center">
                {trainings.map((training) => (
                  <TraningItem
                    key={training.id}
                    id={training.id}
                    title={training.title}
                    time={training.time}
                    places={training.places}
                    maxPlaces={training.maxPlaces}
                    day={training.dayofWeek}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
