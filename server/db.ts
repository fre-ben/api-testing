import { Db, MongoClient, ObjectID } from "mongodb";

let client: MongoClient = null;
let db: Db = null;

const url = process.env.MONGODB_URL;

export type User = {
  id: ObjectID;
  name: string;
  email: string;
  password: string;
};

export async function connectDB(url: string, dbName: string) {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

export async function getMovies() {
  await connectDB(url, "sample_mflix");

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return movies;
}

export async function getMovie(id) {
  await connectDB(url, "sample_mflix");

  const movie = await db
    .collection("movies")
    .findOne({ _id: new ObjectID(id) });

  return movie;
}

export async function getUsers(): Promise<User[]> {
  await connectDB(url, "sample_mflix");

  const users = await db
    .collection("users")
    .find({})
    .sort({ name: 1 })
    .toArray();

  return users;
}

export async function getUsersByName(name: any): Promise<User[]> {
  await connectDB(url, "sample_mflix");

  const users = await db
    .collection("users")
    .find({ name: new RegExp(name, "i") })
    .toArray();
  return users;
}

export async function postNewUser(newUser: User) {
  await connectDB(url, "sample_mflix");

  const userCollection = db.collection("users");

  return userCollection.insertOne(newUser);
}
