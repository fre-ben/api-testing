import { NextApiRequest, NextApiResponse } from "next";
import { getMovies } from "../../server/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const movies = await getMovies();

  res.json(movies);
};
