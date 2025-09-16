import instance from "./instance";

import type { GroupByDateSessionsResponse } from "@/types/sessionsType";

export const getSessionsListApi = async (): Promise<GroupByDateSessionsResponse> => {
  try {
    const response = await instance.get("/v1/sessions");
    console.log("v1/sessions", response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
