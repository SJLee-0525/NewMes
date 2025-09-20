import { http, HttpResponse } from "msw";

import { SESSIONS } from "@datas/SESSIONS";
// @ts-ignore
import { REPORTS } from "@datas/REPORTS";
import { PATIENTS } from "@datas/PATIENTS";
import { NEWS_DATA } from "@datas/NEWS";

const { VITE_NEWS_API_KEY } = import.meta.env;

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

    // return HttpResponse.json({});
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

    // return HttpResponse.json({});
    return HttpResponse.json(groupedByDate);
  }),

  // 상세 리포트 조회
  http.get(`/v1/reports/:reportId`, (req) => {
    const { reportId } = req.params;
    const reportIdNum = Number(reportId);

    const report = REPORTS.reports.find((r) => r.reportId === reportIdNum);

    // return HttpResponse.json({ message: "Report not found" }, { status: 404 });

    if (report) return HttpResponse.json(report);
    else return HttpResponse.json({ message: "Report not found" }, { status: 404 });
  }),

  // 환자 목록 조회
  http.get(`/v1/patients`, (req) => {
    const url = new URL(req.request.url);
    const name = url.searchParams.get("name");

    const searchName = typeof name === "string" ? name.trim().toLowerCase() : "";

    const filteredPatients = PATIENTS.patients.filter((patient) => patient.name.toLowerCase().includes(searchName));

    const patientsList = filteredPatients.map((patient) => ({
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      shootingDate: patient.shootingDate,
      images: patient.images,
    }));

    // return HttpResponse.json([]);
    return HttpResponse.json(patientsList);
  }),

  // 최신 뉴스 목록 조회
  http.get(`https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${VITE_NEWS_API_KEY}`, () => {
    return HttpResponse.json(NEWS_DATA);
    // return HttpResponse.json({
    //   status: "ok",
    //   totalResults: 0,
    //   articles: [],
    // });
  }),
];

export default handlers;
