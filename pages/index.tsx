import Head from "next/head";
import { useEffect, useState } from "react";
import { User } from "../server/db";
import styles from "../styles/Home.module.css";
import { fetchUsers, fetchUsersByName } from "../utils/api";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    displayUsers(users);
  }, []);

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

  async function handleSubmit(searchName) {
    event.preventDefault();
    const users = await fetchUsersByName(searchName);
    setUsers(users);
  }

  const displayUsers = (users) => {
    if (!users) {
      <div>Loading...</div>;
    }
    return users.map((user: User) => (
      <li key={JSON.stringify(user.id)}>
        <p>{user.name}</p>
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
        <button onClick={handleGetUsersClick}>Get users</button>
        <button onClick={handleRandomUserClick}>Get random user</button>
        <form onSubmit={() => handleSubmit(searchQuery)}>
          <label>
            <input
              type="text"
              placeholder="Search users"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <button>Search!</button>
        </form>
        <ul>{displayUsers(users)}</ul>
      </main>
    </div>
  );
}
