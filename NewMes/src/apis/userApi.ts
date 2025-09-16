import instance from "./instance";

import type { GroupByDateSessionsResponse } from "@/types/sessionsType";
import type { GroupByDateReportsResponse } from "@/types/reportsType";

export const getSessionsListApi = async (): Promise<GroupByDateSessionsResponse> => {
  try {
    const response = await instance.get("/v1/sessions");
    console.log("v1/sessions", response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

export const getReportsListApi = async (): Promise<GroupByDateReportsResponse> => {
  try {
    const response = await instance.get("/v1/reports");
    console.log("v1/reports", response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
