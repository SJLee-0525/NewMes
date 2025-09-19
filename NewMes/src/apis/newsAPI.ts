import instance from "@apis/instance";

import type { NewsApiResponse, NewsArticle } from "@/types/newsType";

const { VITE_NEWS_API_KEY } = import.meta.env;

/**
 * 최신 건강 관련 뉴스를 가져옵니다.
 * @returns 최신 뉴스 기사 배열
 * @see {@link NewsArticle}
 * @see {@link NewsApiResponse}
 */
export const getLatestNewsApi = async (): Promise<NewsArticle[]> => {
  try {
    const response = await instance.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${VITE_NEWS_API_KEY}`
    );
    console.log("Latest News", response.data);
    return (response.data as NewsApiResponse).articles;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
