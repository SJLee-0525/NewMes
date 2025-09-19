import { useState, useEffect, useRef, type WheelEvent } from "react";

import { getLatestNewsApi } from "@apis/newsAPI";

import type { NewsArticle } from "@/types/newsType";

import ReloadIcon from "@assets/icons/ReloadIcon";

import NewsBox from "@components/box/NewsBox";
import Unavailable from "@components/unavailable/Unavailable";

const PULL_THRESHOLD = 84; // 새로고침을 트리거하는 당김 거리 (px)

const Dashboard = () => {
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullPosition, setPullPosition] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLatestNews = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      const news = await getLatestNewsApi();
      setLatestNews(news);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      // 애니메이션을 위해 잠시 후 상태를 리셋
      setTimeout(() => {
        setIsRefreshing(false);
        setPullPosition(0);
      }, 500);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, []);

  function handleDragStart(y: number) {
    if (scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
      isDraggingRef.current = true;
      startYRef.current = y;
    }
  }

  function handleDragMove(y: number) {
    if (!isDraggingRef.current) return;

    const pullDistance = y - startYRef.current;
    if (pullDistance > 0) {
      // 아래로 당길 때만 위치 업데이트
      setPullPosition(pullDistance);
    }
  }

  function handleDragEnd() {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    if (pullPosition > PULL_THRESHOLD) {
      fetchLatestNews();
    } else {
      // 임계값 미만이면 원래 위치로 되돌림
      setPullPosition(0);
    }
  }

  // 휠 이벤트 핸들러
  function handleWheel(e: WheelEvent<HTMLDivElement>) {
    const container = scrollContainerRef.current;
    if (!container || isDraggingRef.current) return;

    // 스크롤이 맨 위이고, 휠을 위로 올릴 때
    if (container.scrollTop === 0 && e.deltaY < 0) {
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // 당기는 위치를 업데이트 (너무 많이 당겨지지 않도록 제한)
      const newPullPosition = Math.min(pullPosition + Math.abs(e.deltaY) * 0.5, PULL_THRESHOLD + 50);
      setPullPosition(newPullPosition);

      // 휠 스크롤이 멈추면 새로고침 여부를 결정
      wheelTimeoutRef.current = setTimeout(() => {
        if (pullPosition > PULL_THRESHOLD) fetchLatestNews();
        else setPullPosition(0); // 임계값 미만이면 원위치
      }, 200);
    }
  }

  return (
    <div
      className="w-full h-full flex px-1 flex-col relative overflow-hidden"
      onMouseUp={() => handleDragEnd()}
      onMouseLeave={() => handleDragEnd()}
      onTouchEnd={() => handleDragEnd()}
    >
      {/* 새로고침 아이콘 */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center items-center transition-transform duration-200"
        style={{
          transform: `translateY(${Math.min(pullPosition, PULL_THRESHOLD)}px) translateY(-100%)`,
          opacity: Math.min(pullPosition / PULL_THRESHOLD, 1),
        }}
      >
        <ReloadIcon
          width={40}
          height={40}
          className={`p-2 rounded-full bg-mainPurple ${isRefreshing ? "animate-spin" : ""}`}
          style={{ transform: `rotate(${pullPosition * 2}deg)` }}
        />
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 flex flex-col p-4 gap-4 w-full h-full overflow-y-auto"
        onMouseDown={(e) => handleDragStart(e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientY)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
        onWheel={handleWheel}
      >
        <h1 className="text-3xl font-bold p-2 text-white">Health News</h1>

        <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 w-full">
          {latestNews && latestNews.length > 0 ? (
            latestNews.map((article) => <NewsBox key={article.title} article={article} />)
          ) : (
            <Unavailable type="error" content="News" />
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
