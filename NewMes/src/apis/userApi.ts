import instance from "./instance";

import type { Session, GroupByDateSessionsResponse } from "@/types/sessionsType";
import type { Report, GroupByDateReportsResponse } from "@/types/reportsType";
import type { PatientListItem } from "@/types/patientsType";

export const getSessionsListApi = async (): Promise<GroupByDateSessionsResponse> => {
  try {
    const response = await instance.get("/v1/sessions");
    console.log("v1/sessions", response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

export const getSessionDetailApi = async (sessionId: string): Promise<Session> => {
  try {
    const response = await instance.get(`/v1/sessions/${sessionId}`);
    console.log(`/v1/sessions/${sessionId}`, response.data);
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

export const getReportDetailApi = async (reportId: number): Promise<Report> => {
  try {
    const response = await instance.get(`/v1/reports/${reportId}`);
    console.log(`/v1/reports/${reportId}`, response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

export const getPatientListApi = async (name: string): Promise<PatientListItem[]> => {
  try {
    const response = await instance.get("/v1/patients", {
      params: { name },
    });
    console.log("v1/patients", response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
