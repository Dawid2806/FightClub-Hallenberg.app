import { NextApiRequest, NextApiResponse } from "next";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetUserLastVisitDocument,
  InsertUserLastVisitDocument,
  UpdateUserLastVisitDocument,
} from "@/generated/graphql";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId } = req.body;

    try {
      const lastVisitDate = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      ).toISOString();

      const { data: userData } = await apolloClient.query({
        query: GetUserLastVisitDocument,
        variables: { userId: userId },
      });

      if (
        !userData ||
        !userData.user_last_visits ||
        userData.user_last_visits.length === 0
      ) {
        await apolloClient.mutate({
          mutation: InsertUserLastVisitDocument,
          variables: { userId: userId, lastVisitDate: lastVisitDate },
        });
      } else {
        await apolloClient.mutate({
          mutation: UpdateUserLastVisitDocument,
          variables: { userId: userId, lastVisitDate: lastVisitDate },
        });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error updating user last visit:", error);
      res.status(500).json({ success: false, error: JSON.stringify(error) });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};