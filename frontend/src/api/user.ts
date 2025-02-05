import { get } from "./requests";
import { APIResult } from "./requests";

export interface User {
  id: string;
  email: string;
}

export async function verifyUser(token: string): Promise<APIResult<User>> {
  try {
    const response = await get("/users/login", {
      Authorization: `Bearer ${token}`,
    });
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
} 