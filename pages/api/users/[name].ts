import { NextApiRequest, NextApiResponse } from "next";
import { deleteUserFromDB, getUsersByName } from "../../../server/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { name } = req.query;
    const users = await getUsersByName(name);
    res.status(200).json(users);
  }

  if (req.method === "DELETE") {
    const { name } = req.query;

    await deleteUserFromDB(name);
    res.status(200).json(name);
  }
};
