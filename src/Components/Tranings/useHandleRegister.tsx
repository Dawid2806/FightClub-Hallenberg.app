import { useState } from "react";
import {
  GetAllTraningsDocument,
  GetAllUsersInCurrentTrainingDocument,
  GetTrainingUsersDocument,
  GetTrainingUsersQuery,
  GetTrainingUsersQueryVariables,
  useAddUserToTrainingMutation,
  useRemoveUserFromTrainingMutation,
} from "../../generated/graphql";
import { useQuery } from "@apollo/client";

type UseHandleRegisterProps = {
  user: { id: string } | null;
  id: string;
  places: number;
  maxPlaces: number;
};

export const useHandleRegister = ({
  user,
  id,
  places,
  maxPlaces,
}: UseHandleRegisterProps) => {
  const [addUserToTraining] = useAddUserToTrainingMutation({
    refetchQueries: [
      {
        query: GetTrainingUsersDocument,
        variables: {
          training_id: id,
        },
      },
      {
        query: GetAllTraningsDocument,
      },
    ],
  });
  const [removeUserFromTraining] = useRemoveUserFromTrainingMutation({
    refetchQueries: [
      {
        query: GetTrainingUsersDocument,
        variables: {
          training_id: id,
        },
      },
      {
        query: GetAllTraningsDocument,
      },
    ],
  });

  const [isUserInTraning, setIsUserInTraning] = useState(false);

  const { data } = useQuery<
    GetTrainingUsersQuery,
    GetTrainingUsersQueryVariables
  >(GetTrainingUsersDocument, {
    variables: {
      training_id: id,
    },
    query: GetTrainingUsersDocument,
  });

  const isCurrentUserInTraining = data?.Members.some(
    (member) => user?.id === member.userID
  );
  const AddUserToTraining = () => {
    if (isCurrentUserInTraining || places === maxPlaces) {
      setIsUserInTraning(true);
      return;
    } else {
      setIsUserInTraning(true);
      addUserToTraining({
        variables: {
          training_id: id,
          user_id: user?.id!,
        },
      });
    }
  };

  const RemoveUserFromTraining = () => {
    if (!isCurrentUserInTraining) {
      setIsUserInTraning(false);
      return;
    } else {
      setIsUserInTraning(true);
      removeUserFromTraining({
        variables: {
          training_id: id,
          user_id: user?.id!,
        },
      });
    }
  };

  return {
    AddUserToTraining,
    RemoveUserFromTraining,
    isCurrentUserInTraining,
  };
};
