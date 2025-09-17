import instance from "@apis/instance";

import type { Session, GroupByDateSessionsResponse } from "@/types/sessionsType";
import type { Report, GroupByDateReportsResponse } from "@/types/reportsType";
import type { PatientListItem } from "@/types/patientsType";

/**
 * 대화 세션 목록을 가져옵니다.
 * @returns 날짜별로 그룹화된 대화 세션 목록
 * @see {@link Session}
 * @see {@link GroupByDateSessionsResponse}
 */
export const getSessionsListApi = async (): Promise<GroupByDateSessionsResponse> => {
  try {
    const response = await instance.get("/v1/sessions");
    console.log("v1/sessions", response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

/**
 * 대화 세션의 세부 정보를 가져옵니다.
 * @param sessionId 대화 세션 ID
 * @returns 대화 세션의 세부 정보
 * @see {@link Session}
 */
export const getSessionDetailApi = async (sessionId: string): Promise<Session> => {
  try {
    const response = await instance.get(`/v1/sessions/${sessionId}`);
    console.log(`/v1/sessions/${sessionId}`, response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

/**
 * 리포트 목록을 가져옵니다.
 * @returns 날짜별로 그룹화된 리포트 목록
 * @see {@link Report}
 * @see {@link GroupByDateReportsResponse}
 */
export const getReportsListApi = async (): Promise<GroupByDateReportsResponse> => {
  try {
    const response = await instance.get("/v1/reports");
    console.log("v1/reports", response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

/**
 * 특정 리포트의 세부 정보를 가져옵니다.
 * @param reportId 리포트 ID
 * @returns 리포트의 세부 정보
 * @see {@link Report}
 */
export const getReportDetailApi = async (reportId: number): Promise<Report> => {
  try {
    const response = await instance.get(`/v1/reports/${reportId}`);
    console.log(`/v1/reports/${reportId}`, response.data);
    return response.data;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

/**
 * 환자 목록을 이름으로 검색합니다.
 * @param name 환자 이름 (부분 일치)
 * @returns 환자 목록
 * @see {@link PatientListItem}
 */
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
