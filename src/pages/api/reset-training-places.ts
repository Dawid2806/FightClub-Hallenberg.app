import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  ResetTrainingPlacesAndRemoveMembersDocument,
} from "@/generated/graphql";
import {  apolloClient } from "../../graphql/apolloClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const isCronTriggerRequest = req.headers['x-hasura-event-id'];

  if (isCronTriggerRequest) {
    try {
      const result = await apolloClient.mutate({
        mutation: ResetTrainingPlacesAndRemoveMembersDocument,
      });
      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error("Error resetting training places:", error as Error);
      res.status(500).json({ success: false, error: JSON.stringify(error) });
    }
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ success: false, message: "Unauthorized request" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.NHOST_JWT_SECRET as string);

    const hasuraClaims = (decodedToken as any)["https://hasura.io/jwt/claims"];
    const isAdmin = hasuraClaims["x-hasura-allowed-roles"].includes("admin");

    if (!isAdmin) {
      res.status(401).json({ success: false, message: "Unauthorized request" });
      return;
    }

    const result = await apolloClient.mutate({
      mutation: ResetTrainingPlacesAndRemoveMembersDocument,
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error resetting training places:", error as Error);
    res.status(500).json({ success: false, error: JSON.stringify(error) });
  }
};