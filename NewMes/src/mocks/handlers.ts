import { http, HttpResponse } from "msw";

import { SESSIONS } from "@datas/SESSIONS";

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
];

export default handlers;
