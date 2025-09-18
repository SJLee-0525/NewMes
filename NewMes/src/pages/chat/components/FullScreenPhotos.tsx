import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CloseIcon from "@assets/icons/CloseIcon";
import ArrowLeftIcon from "@assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "@assets/icons/ArrowRightIcon";

import useModalStore from "@stores/modalStore";

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const FullScreenPhotos = ({ dateTime, photos }: { dateTime: string; photos: string[] }) => {
  const TOTAL = photos.length;

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const containerRef = useRef<HTMLDivElement>(null);

  const { closePhotoModal } = useModalStore();

  const goNext = useCallback(() => {
    if (!TOTAL) return;

    setDir(1);
    setIndex((i) => (i + 1) % TOTAL);
  }, [TOTAL]);

  const goPrev = useCallback(() => {
    if (!TOTAL) return;

    setDir(-1);
    setIndex((i) => (i - 1 + TOTAL) % TOTAL);
  }, [TOTAL]);

  // 키보드 네비게이션
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    }

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // 뒤에 살짝 보일 카드 개수
  const peekCount = clamp(TOTAL - 1, 0, 3);

  const layers = useMemo(() => {
    // 현재, +1, +2, +3 인덱스 계산
    const arr = Array.from({ length: 1 + peekCount }, (_, i) => (index + i) % TOTAL);

    // 레이어별 스타일 0: 최상단 카드, 1~: 뒤 카드
    const conf = [
      { scale: 1, tx: 0, ty: 0, z: 30, blur: 0 },
      { scale: 0.975, tx: 20, ty: -16, z: 20, blur: 1 },
      { scale: 0.95, tx: 38, ty: -28, z: 10, blur: 2 },
      { scale: 0.925, tx: 54, ty: -36, z: 5, blur: 2.5 },
    ];

    return arr.map((idx, i) => ({
      idx,
      style: conf[i],
    }));
  }, [index, peekCount, TOTAL]);

  if (!TOTAL) {
    return <div className={`flex items-center justify-center text-sm text-neutral-500`}>이미지가 없습니다.</div>;
  }

  // 최상단 카드 전환 애니메이션 설정
  const variants = {
    enter: (direction: 1 | -1) => ({
      x: direction === 1 ? 40 : -40,
      opacity: 0.6,
      rotate: direction === 1 ? 0.6 : -0.6,
    }),
    center: { x: 0, opacity: 1, rotate: 0 },
    exit: (direction: 1 | -1) => ({
      x: direction === 1 ? -120 : 120,
      opacity: 0,
      rotate: direction === 1 ? -0.6 : 0.6,
    }),
  } as const;

  return (
    <div ref={containerRef} className="relative w-full h-full select-none" aria-roledescription="carousel">
      <div className="absolute top-0 flex justify-between items-center w-full h-fit p-3 z-100 bg-black/70 pointer-events-none">
        <span className="font-pre-medium text-white text-sm p-2">{dateTime}</span>

        <button
          onClick={closePhotoModal}
          className="p-2 rounded-xl bg-transparent hover:bg-red-500 transition-color duration-300 focus:outline-none cursor-pointer pointer-events-auto"
          aria-label="Close"
        >
          <CloseIcon width={24} height={24} strokeColor="white" />
        </button>
      </div>

      {/* 카드 영역 */}
      <div className="absolute inset-0">
        {/* 뒤 카드들 (살짝 보이게, 고정 배치) */}
        {layers.slice(1).map(({ idx, style }) => (
          <div key={`peek-${idx}`} className="absolute inset-0 flex" style={{ zIndex: style.z }} aria-hidden>
            <div
              className="w-280 max-w-[90vw] h-210 max-h-[70vh] bg-listActive/80 m-auto origin-top-right rounded-2xl shadow-2xl overflow-hidden"
              style={{
                transform: `translate(${style.tx}px, ${style.ty}px) scale(${style.scale})`,
                filter: `blur(${style.blur}px)`,
              }}
            >
              <img
                src={photos[idx]}
                alt={photos[idx] ? `Photo ${idx + 1}` : "No Image"}
                className="inset-0 h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        ))}

        {/* 최상단(현재) 카드 */}
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={`top-${layers[0].idx}`}
            className="absolute inset-0 flex z-40"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 420, damping: 48, mass: 0.8 }}
          >
            <div className="w-280 max-w-[90vw] h-210 max-h-[70vh] bg-toggleInactive m-auto origin-center rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden">
              <img
                src={photos[layers[0].idx]}
                alt={`Photo ${layers[0].idx + 1}`}
                className="inset-0 h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 좌/우 네비게이션 버튼 */}
      <div className="absolute inset-0 flex items-center justify-between px-8 z-100 pointer-events-none">
        <button
          onClick={goPrev}
          className="p-2 rounded-full bg-black/40 hover:bg-toggleInactive/70 transition-color duration-300 focus:outline-none cursor-pointer pointer-events-auto"
          aria-label="Previous"
        >
          <ArrowLeftIcon width={28} height={28} strokeColor="white" />
        </button>

        <button
          onClick={goNext}
          className="p-2 rounded-full bg-black/40 hover:bg-toggleInactive/70 transition-color duration-300 focus:outline-none cursor-pointer pointer-events-auto"
          aria-label="Next"
        >
          <ArrowRightIcon width={28} height={28} strokeColor="white" />
        </button>
      </div>

      {/* 페이지 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center p-2 gap-2 rounded-full bg-black/70">
        {photos.map((_, i) => (
          <span
            key={i}
            className={`${i === index ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/60"} rounded-full transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default FullScreenPhotos;
