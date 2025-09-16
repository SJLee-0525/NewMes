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

  // 상세 대화 조회
  http.get(`/v1/sessions/:sessionId`, (req) => {
    const { sessionId } = req.params;
    const sessionIdNum = Number(sessionId);

    const session = SESSIONS.sessions.find((s) => s.id === sessionIdNum);

    if (session) return HttpResponse.json(session);
    else return HttpResponse.json({ message: "Session not found" }, { status: 404 });
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

  // 상세 리포트 조회
  http.get(`/v1/reports/:reportId`, (req) => {
    const { reportId } = req.params;
    const reportIdNum = Number(reportId);

    const report = REPORTS.reports.find((r) => r.reportId === reportIdNum);

    if (report) return HttpResponse.json(report);
    else return HttpResponse.json({ message: "Report not found" }, { status: 404 });
  }),
];

export default handlers;
