import { useState, useRef, useEffect } from "react";

import type { MediType } from "@/types/MediType";

import { getDiseaseList } from "@apis/mediApi";

import CloseIcon from "@assets/icons/CloseIcon";
import SearchIcon from "@assets/icons/SearchIcon";
import SendIcon from "@assets/icons/SendIcon";
import ClipIcon from "@assets/icons/ClipIcon";

import useSystemStore from "@stores/systemStore";

import tempImg1 from "@datas/cxr_image/cxr_01.jpg";
import tempImg2 from "@datas/cxr_image/cxr_02.jpeg";
import tempImg3 from "@datas/cxr_image/cxr_03.jpeg";

const TEMP_IMAGES = [tempImg1, tempImg2, tempImg3];

const ChatInput = ({ onSubmit }: { onSubmit: (data: { message: string; images: File[] | null }) => void }) => {
  const { selectedPatientId } = useSystemStore();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [searchDisease, setSearchDisease] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [diseaseList, setDiseaseList] = useState<MediType[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<number>(0);
  const [sickType, setSickType] = useState<number>(1); // 1: 3단, 2: 4단
  const searchTypeRef = useRef<HTMLSelectElement | null>(null);

  const searchRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 자동 높이 조절
  function useAutoResizeTextarea(e: React.FormEvent<HTMLTextAreaElement>) {
    // 최대 높이 설정
    const maxHeight = 180; // px

    const textarea = e.currentTarget;
    if (textarea.scrollHeight > maxHeight) {
      textarea.style.height = maxHeight + "px";
      textarea.style.overflowY = "scroll";
    } else {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  // 사진 첨부
  function handleAttachImage() {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        setSelectedImages([...(selectedImages || []), ...Array.from(target.files)]);
      }
    };
    input.click();
  }

  // 사진 제거
  function handleRemoveImage(idx: number) {
    if (selectedImages) {
      const newImages = [...selectedImages];
      newImages.splice(idx, 1);
      setSelectedImages(newImages.length > 0 ? newImages : []);
    }
  }

  // 검색어 입력 변경
  function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  // 질병 검색
  async function fetchDiseaseList() {
    try {
      const diseaseType = searchTypeRef.current?.value || "SICK_NM";

      const diseases = await getDiseaseList({
        diseaseType,
        sickType,
        searchText: searchQuery,
      });

      setDiseaseList(diseases);
      setSelectedDisease(0);

      isLoading && setIsLoading(false);
    } catch (error) {
      console.error("Error fetching disease list:", error);
    }
  }

  // 검색어 변경 시 질병 리스트 갱신
  useEffect(() => {
    if (isLoading) return;

    const delayDebounceFn = setTimeout(() => {
      fetchDiseaseList();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, sickType]);

  // 질병 검색 중 키보드 이벤트
  function handleSearchDiseaseKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "Escape":
        e.preventDefault();

        setSearchDisease(false);
        textareaRef.current?.focus();
        break;

      case "ArrowDown":
        e.preventDefault();

        if (diseaseList && diseaseList.length > 0 && selectedDisease < diseaseList.length - 1) {
          setSelectedDisease(selectedDisease + 1);
        }
        break;

      case "ArrowUp":
        e.preventDefault();

        if (diseaseList && diseaseList.length > 0 && selectedDisease > 0) {
          setSelectedDisease(selectedDisease - 1);
        }
        break;

      case "Enter":
        e.preventDefault();

        if (diseaseList && diseaseList.length > 0) {
          // Enter가 두 번 호출되는 현상 방지: compositionend 상태에서만 실행
          if (!(e.nativeEvent as any).isComposing) handleSelectDisease(diseaseList[selectedDisease]);
        }
        break;
    }
  }

  // 질병 선택
  function handleSelectDisease(disease: MediType) {
    if (textareaRef.current) {
      const currentText = textareaRef.current.value;

      // 기존 텍스트에 질병 정보 추가
      const sickData = `질병 코드: ${disease.sickCd}, 질병명: ${disease.sickNm}-${disease.sickEngNm}\n`;
      const newText = currentText ? `${currentText}\n${sickData}` : sickData;

      // 텍스트 영역에 반영 및 높이 조절
      textareaRef.current.value = newText;
      useAutoResizeTextarea({ currentTarget: textareaRef.current } as any);
    }

    // 포커스 이동
    setTimeout(() => {
      setSearchDisease(false);
      setSearchQuery("");
      setSelectedDisease(0);
      textareaRef.current?.focus();
    }, 100);
  }

  // Enter 키로 전송 (Shift + Enter는 줄바꿈)
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // 화살표 위 키와 Shift 키가 함께 눌렸을 때 질병 검색창 열기
    if (e.key === "ArrowUp" && e.shiftKey) {
      e.preventDefault();
      setSearchDisease(true);

      // 포커스 이동
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      if ((e.nativeEvent as any).isComposing) return; // 한글 조합 중이면 무시
      e.preventDefault();
      handleSubmit();
    }
  }

  // 메시지 전송
  function handleSubmit() {
    const message = textareaRef.current?.value;
    console.log(message);
    if (!message || message?.trim() === "") return;

    if (selectedImages && selectedImages.length > 0) {
      // 이미지 업로드 로직 필요
      console.log("Sending message with images:", message, selectedImages);
    }

    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto"; // 높이 초기화
    }

    setSelectedImages([]);

    onSubmit({ message: message || "", images: selectedImages.length > 0 ? selectedImages : null });
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, []);

  // 환자 패널에서 선택된 이미지를 기반으로 File 객체 생성 후 선택 이미지 목록에 추가 (임시)
  useEffect(() => {
    async function fetchAndSetImages() {
      if (selectedPatientId.images.length === 0) return;

      const imageFiles = await Promise.all(
        selectedPatientId.images.map(async (img, idx) => {
          try {
            const response = await fetch(TEMP_IMAGES[idx % 3]);
            if (!response.ok) throw new Error(`Failed to fetch image: ${img.filename}`);

            const blob = await response.blob();
            return new File([blob], img.filename, { type: blob.type });
          } catch (error) {
            console.error("Error creating file from image:", error);
            return null;
          }
        })
      );

      // 중복 없이 추가
      const uniqueFiles = imageFiles.filter(
        (file): file is File => file !== null && !selectedImages.some((f) => f.name === file.name)
      );

      setSelectedImages((prev) => [...prev, ...uniqueFiles]);
    }

    fetchAndSetImages();
  }, [selectedPatientId.images]);

  return (
    <section className="relative flex flex-col justify-between items-start w-full max-w-full h-fit px-6 py-4 gap-4 bg-inactive rounded-3xl">
      {/* 첨부된 이미지 미리보기 */}
      {selectedImages && selectedImages.length > 0 && (
        <div className="flex w-full max-w-[30vw] h-fit gap-3 overflow-x-auto">
          {selectedImages.map((image, idx) => (
            <div key={idx} className="relative flex-shrink-0 w-24 h-24 aspect-[1/1] rounded-lg overflow-hidden">
              <img src={URL.createObjectURL(image)} alt={`Selected ${idx}`} className="w-full h-full object-cover" />

              <div className="group absolute inset-0 w-full h-full">
                <span className="absolute top-1 right-1 w-fit h-fit aspect-[1/1] p-1 bg-black bg-opacity-50 text-white rounded-full transition-opacity hover:bg-opacity-75 opacity-0 group-hover:opacity-100 cursor-pointer">
                  <CloseIcon width={20} height={20} strokeWidth={3} onClick={() => handleRemoveImage(idx)} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 질병 검색 */}
      {searchDisease && (
        <section className="relative w-full max-w-120">
          {/* 질병 검색 결과 */}
          {diseaseList && diseaseList.length > 0 && (
            <div className="absolute bottom-12 w-full max-h-60 mb-2 z-10 rounded-xl font-pre-regular text-white bg-search overflow-y-auto">
              {diseaseList.map((disease, idx) => (
                <div
                  key={disease.sickCd}
                  className={`px-3 py-2 ${selectedDisease === idx ? "bg-listActive" : "hover:bg-listActive"} transition-colors duration-200 cursor-pointer break-words whitespace-nowrap line-clamp-1`}
                  onClick={() => {
                    handleSelectDisease(disease);
                  }}
                >
                  <strong>[ {disease.sickCd} ]</strong> {disease.sickNm}{" "}
                  <small className="text-title">{disease.sickEngNm}</small>
                </div>
              ))}
            </div>
          )}

          {/* 질병 검색 입력 */}
          <section className="flex gap-2 rounded-xl bg-search">
            <input
              type="text"
              ref={searchRef}
              className="w-full h-11 px-3 font-pre-regular text-white focus:outline-none "
              placeholder="Type disease name..."
              onKeyDown={handleSearchDiseaseKeyDown}
              onChange={handleSearchInputChange}
            />

            <select
              name="search-type"
              id="search-type"
              className="me-2 font-pre-medium text-sm text-white bg-transparent focus:outline-none"
              ref={searchTypeRef}
            >
              <option value="SICK_NM">상병명</option>
              <option value="SICK_CD">상병코드</option>
            </select>

            <select
              name="sick-type"
              id="sick-type"
              className="me-3 text-white font-pre-medium text-sm bg-transparent focus:outline-none"
              value={sickType}
              onChange={(e) => setSickType(Number(e.target.value))}
            >
              <option value="1">3단</option>
              <option value="2">4단</option>
            </select>
          </section>
        </section>
      )}

      <textarea
        ref={textareaRef}
        className="w-full min-h-10 max-h-80 px-2 pt-1 resize-none font-pre-regular text-icon text-xl placeholder:text-icon placeholder:text-xl bg-transparent outline-none overflow-y-auto"
        placeholder="Ask anything.."
        rows={1}
        style={{ wordBreak: "break-word" }}
        onInput={useAutoResizeTextarea}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <section className="flex justify-between items-center w-full h-fit">
        <SearchIcon
          width={40}
          height={40}
          strokeColor="#8C8C8C"
          className={`p-1 rounded-full cursor-pointer transition-colors duration-300 ${searchDisease ? "bg-toggleInactive" : "bg-transparent hover:bg-toggleInactive"}`}
          onClick={() => {
            setSearchDisease(true);

            // 포커스 이동
            setTimeout(() => {
              searchRef.current?.focus();
            }, 100);
          }}
        />

        <section className="flex justify-center items-center w-fit h-fit gap-2.5">
          <ClipIcon
            width={40}
            height={40}
            strokeColor="#8C8C8C"
            className="p-1 rounded-full cursor-pointer hover:bg-toggleInactive transition-color duration-300"
            onClick={handleAttachImage}
          />
          <SendIcon
            width={40}
            height={40}
            strokeColor="#8C8C8C"
            className="p-1.5 rounded-full cursor-pointer hover:bg-toggleInactive transition-color duration-300"
            onClick={handleSubmit}
          />
        </section>
      </section>
    </section>
  );
};

export default ChatInput;
