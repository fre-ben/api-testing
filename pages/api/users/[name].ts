import { NextApiRequest, NextApiResponse } from "next";
import { getUsersByName } from "../../../server/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { name } = req.query;
    const users = await getUsersByName(name);
    res.status(200).json(users);
  }
};
