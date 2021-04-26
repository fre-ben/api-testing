import { NextApiRequest, NextApiResponse } from "next";
import { getMovie } from "../../../server/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    console.log(id);
    const movie = await getMovie(id);
    console.log(movie);
    res.status(200).json(movie);
  } catch (err) {
    res.status(404).json(err);
  }
};
