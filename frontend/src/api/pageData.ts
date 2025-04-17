import { APIResult, get, post } from "./requests";

export type Field = {
  name: string;
  type: string;
  data: unknown;
};

export type PageData = {
  pagename: string;
  lastUpdate: string; // ISO date string
  fields: Field[];
};

/**
 * Fetches all page data from the backend.
 *
 * @returns An APIResult with an array of PageData or an error.
 */
export async function getPageData(): Promise<APIResult<PageData[]>> {
  try {
    // GET request to backend endpoint for page data.
    const response = await get("/api/pageData/all");
    const data = (await response.json()) as PageData[];
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

/**
 * Updates page data for a given page.
 *
 * @param token The admin token for authorization.
 * @param payload An object containing the pagename and fields array.
 * @returns An APIResult with the updated PageData or an error.
 */
export async function updatePageData(
  token: string,
  payload: { pagename: string; fields: Field[] },
): Promise<APIResult<PageData>> {
  try {
    // POST request to secured update endpoint.
    // The headers include the Bearer token for authentication.
    const response = await post("/api/pageData/update", payload, {
      Authorization: `Bearer ${token}`,
    });
    const data = (await response.json()) as PageData;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
