import { http, HttpResponse } from "msw";

import { SESSIONS } from "@datas/SESSIONS";
import { REPORTS } from "@datas/REPORTS";

const handlers = [
  // 대화 목록 조회
  http.get(`/v1/sessions`, () => {
    const groupedByDate: Record<string, typeof SESSIONS.sessions> = {};

    SESSIONS.sessions
      .slice()
      .sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime())
      .forEach((session) => {
        const date = session.createDate.split("T")[0]; // 'YYYY-MM-DD'

        if (!groupedByDate[date]) groupedByDate[date] = [];
        groupedByDate[date].push(session);
      });

    return HttpResponse.json(groupedByDate);
  }),

  // 리포트 목록 조회
  http.get(`/v1/reports`, () => {
    const groupedByDate: Record<string, typeof REPORTS.reports> = {};

    REPORTS.reports
      .slice()
      .sort((a, b) => new Date(b.examDate).getTime() - new Date(a.examDate).getTime())
      .forEach((report) => {
        const date = report.examDate.split("T")[0]; // 'YYYY-MM-DD'

        if (!groupedByDate[date]) groupedByDate[date] = [];
        groupedByDate[date].push(report);
      });

    return HttpResponse.json(groupedByDate);
  }),
];

export default handlers;
