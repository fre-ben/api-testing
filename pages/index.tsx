import Head from "next/head";
import { useEffect, useState } from "react";
import { User } from "../server/db";
import styles from "../styles/Home.module.css";
import {
  deleteUser,
  fetchUsers,
  fetchUsersByName,
  postNewUser,
} from "../utils/api";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entries, setEntries] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setSearchQuery("");
    setEntries({
      name: "",
      email: "",
      password: "",
    });
  }, [users]);

  async function handleGetUsersClick(): Promise<void> {
    const users = await fetchUsers();
    console.log(users);
    setUsers(users);
    console.log("button click");
  }

  async function handleRandomUserClick(): Promise<void> {
    const users = await fetchUsers();
    const arrLength = users.length - 1;
    const randomNumber = Math.floor(Math.random() * arrLength);
    setUsers([users[randomNumber]]);
  }

  async function handleSubmit(event, searchName: string) {
    event.preventDefault();
    const users = await fetchUsersByName(searchName);
    setUsers(users);
    setSearchQuery("");
  }

  async function handleUserFormSubmit(event) {
    event.preventDefault();

    const newUser = {
      name: entries.name,
      email: entries.email,
      password: entries.password,
    };

    await postNewUser(newUser);
    setEntries({
      name: "",
      email: "",
      password: "",
    });
    setUsers([newUser]);
  }

  async function handleDeleteUser(userName: string) {
    await deleteUser(userName);
    const index = users.findIndex((user) => user.name === userName);
    setUsers(users.splice(index, 1));
    setUsers(users);
  }

  const displayUsers = (users: User[]) => {
    if (!users) {
      <div>Loading...</div>;
    }
    return users.map((user: User) => (
      <li key={JSON.stringify(user.id)}>
        <p>{user.name}</p>
        <button onClick={() => handleDeleteUser(user.name)}>🐬</button>
        <span>{user.email}</span>
      </li>
    ));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleUserFormSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={entries.name}
            onChange={(e) => setEntries({ ...entries, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            value={entries.email}
            onChange={(e) => setEntries({ ...entries, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={entries.password}
            onChange={(e) =>
              setEntries({ ...entries, password: e.target.value })
            }
          />
          <button>Create new user</button>
        </form>
        <button onClick={handleGetUsersClick}>Get users</button>
        <button onClick={handleRandomUserClick}>Get random user</button>
        <form onSubmit={(event) => handleSubmit(event, searchQuery)}>
          <label>
            <input
              type="text"
              placeholder="Search users"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <button>Search!</button>
        </form>
        <ul>{displayUsers(users)}</ul>
      </main>
    </div>
  );
}
