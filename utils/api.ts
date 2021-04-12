import { User } from "../server/db";

export async function fetchUrl<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

export async function fetchUsers(): Promise<User[]> {
  return await fetchUrl("/api/users");
}

export async function fetchUsersByName(name): Promise<User[]> {
  return await fetchUrl(`/api/users/${name}`);
}

export async function postNewUser(newUser: User) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (response.ok) {
    return response;
  } else {
    alert("User already exists " + response.status);
  }
}
