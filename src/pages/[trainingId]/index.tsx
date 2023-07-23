import {
  GetAllTraningsDocument,
  GetAllTraningsQuery,
  GetAllUsersInCurrentTrainingDocument,
  GetAllUsersInCurrentTrainingQuery,
  GetAllUsersInCurrentTrainingQueryVariables,
} from "@/generated/graphql";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { apolloClient } from "../../graphql/apolloClient";
import Head from "next/head";
import { useQuery } from "@apollo/client";

interface TrainingDetailsProps {
  data: GetAllUsersInCurrentTrainingQuery;
  loading: boolean;
}

const TrainingDetails = ({}) => {
  const router = useRouter();
  const { trainingId } = router.query;

  const { loading, error, data } = useQuery<GetAllUsersInCurrentTrainingQuery>(
    GetAllUsersInCurrentTrainingDocument,
    {
      variables: {
        training_id: trainingId,
      },
      pollInterval: 1000,
    }
  );
  if (!trainingId) {
    return <div>Loading...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error...</div>;
  }

  if (!data || !data.Trainings_by_pk) {
    return <div>No data...</div>;
  }
  return (
    <main className=" flex flex-col justify-center items-center mt-20">
      <Head>
        <title>Traning {data.Trainings_by_pk?.title}</title>
      </Head>
      <h2 className="text-center text-2xl font-semibold mt-6 mb-4">
        {data.Trainings_by_pk?.title.toUpperCase()}
      </h2>
      <p className="text-center text-lg mb-4 capitalize	">
        am: {data.Trainings_by_pk?.dayofWeek}
      </p>
      <p className="text-center text-lg mb-4 capitalize	">
        Trainer: <span>{data.Trainings_by_pk?.coachName}</span>
      </p>

      <p className="text-center text-lg mb-4 capitalize	">
        um : {data.Trainings_by_pk?.time.slice(0, -3)} uhr
      </p>

      <h3 className="text-center text-xl font-semibold my-4">Mitglieder:</h3>
      <ul className="space-y-2">
        {data.Trainings_by_pk?.Members.map((member) => (
          <li
            key={member.user.displayName}
            className="border rounded-lg px-4 py-2 flex items-center justify-between"
          >
            <span>{member.user.displayName}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query<GetAllTraningsQuery>({
    query: GetAllTraningsDocument,
  });

  return {
    paths: data.Trainings.filter((training) => training.id).map((training) => {
      return { params: { trainingId: training.id.toString() } };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.trainingId) {
    return {
      props: {},
    };
  }
  const trainingId = params?.trainingId;

  const { data, loading } = await apolloClient.query<
    GetAllUsersInCurrentTrainingQuery,
    GetAllUsersInCurrentTrainingQueryVariables
  >({
    query: GetAllUsersInCurrentTrainingDocument,

    variables: {
      training_id: trainingId.toString(),
    },
  });
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
      loading: loading,
    },
    revalidate: 1,
  };
};

export default TrainingDetails;
