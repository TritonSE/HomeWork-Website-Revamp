import { APIResult, get, post } from "./requests";

export type User = {
  id: string;
  email: string;
  privileged?: boolean;
};

export type UserCreate = {
  _id: string;
  name: string;
  email: string;
};

export async function verifyUser(token: string): Promise<APIResult<User>> {
  try {
    const response = await get("/users/whoami", {
      Authorization: `Bearer ${token}`,
    });
    const data = (await response.json()) as User;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function createUser({
  firstName,
  lastName,
  email,
  password,
  token,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
}): Promise<APIResult<UserCreate>> {
  try {
    const response = await post(
      "/users/create",
      {
        name: `${firstName} ${lastName}`,
        email,
        password,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    const data = (await response.json()) as UserCreate;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
