import { NextApiRequest, NextApiResponse } from "next";
import { getUsers, postNewUser, User } from "../../server/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const users = await getUsers();
    res.status(200).json(users);
  }

  if (req.method === "POST") {
    const newUser: User = req.body;

    const currentUsers = await getUsers();
    const checkExists = currentUsers.some((user) => user.name === newUser.name);

    if (checkExists) {
      res.status(400).json(newUser);
    } else {
      await postNewUser(newUser);
      res.status(200).json(newUser);
    }
  }
};
