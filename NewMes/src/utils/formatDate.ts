/**
 * 주어진 ISO 8601 형식의 날짜 문자열을 포맷된 날짜 문자열로 변환합니다.
 * @param dateString ISO 8601 형식의 날짜 문자열 (예: "2023-10-05T14:48:00.000Z")
 * @returns 포맷된 날짜 문자열 (예: "오늘", "어제", "23/10/05")
 */
export const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  function isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  }

  if (isSameDay(date, today)) return "오늘";
  else if (isSameDay(date, yesterday)) return "어제";
  else {
    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yy}/${mm}/${dd}`;
  }
};

/**
 * 주어진 ISO 8601 형식의 날짜 문자열을 포맷된 날짜와 시간 문자열로 변환합니다.
 * @param dateString ISO 8601 형식의 날짜 문자열 (예: "2023-10-05T14:48:00.000Z")
 * @returns 포맷된 날짜와 시간 문자열 (예: "2023년 10월 05일 오후 02:48")
 */
export const getFormattedDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};
