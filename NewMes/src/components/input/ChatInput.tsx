import { useState, useRef, useEffect } from "react";

import CloseIcon from "@assets/icons/CloseIcon";
import SearchIcon from "@assets/icons/SearchIcon";
import ClipIcon from "@assets/icons/ClipIcon";

import useSystemStore from "@stores/systemStore";

import tempImg1 from "@datas/cxr_image/cxr_01.jpg";
import tempImg2 from "@datas/cxr_image/cxr_02.jpeg";
import tempImg3 from "@datas/cxr_image/cxr_03.jpeg";

const TEMP_IMAGES = [tempImg1, tempImg2, tempImg3];

const ChatInput = ({ onSubmit }: { onSubmit: (data: { message: string; images: File[] | null }) => void }) => {
  const { selectedPatientId } = useSystemStore();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 자동 높이 조절
  function useAutoResizeTextarea(e: React.FormEvent<HTMLTextAreaElement>) {
    const textarea = e.currentTarget;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  // 사진 첨부
  function handleAttachImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setSelectedImages([...(selectedImages || []), target.files[0]]);
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

  // Enter 키로 전송 (Shift + Enter는 줄바꿈)
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
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
    <section className="flex flex-col justify-between items-start w-full max-w-fullh-fit px-6 py-4 gap-4 bg-inactive rounded-3xl">
      {/* 첨부된 이미지 미리보기 */}
      {selectedImages && selectedImages.length > 0 && (
        <div className="flex w-full max-w-[30vw] h-fit gap-3 overflow-x-auto">
          {selectedImages.map((image, idx) => (
            <div key={idx} className="relative flex-shrink-0 w-24 h-24 aspect-[1/1] rounded-lg overflow-hidden">
              <img src={URL.createObjectURL(image)} alt={`Selected ${idx}`} className="w-full h-full object-cover" />

              <div className="group absolute inset-0 w-full h-full">
                <span className="absolute top-1 right-1 w-fit h-fit aspect-[1/1] p-1 bg-black bg-opacity-50 text-white rounded-full transition-opacity hover:bg-opacity-75 opacity-0 group-hover:opacity-100">
                  <CloseIcon width={20} height={20} strokeWidth={3} onClick={() => handleRemoveImage(idx)} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <textarea
        ref={textareaRef}
        className="w-full min-h-10 max-h-80 resize-none font-pre-regular text-icon text-xl placeholder:text-icon placeholder:text-xl bg-transparent outline-none overflow-y-auto"
        placeholder="Ask anything.."
        rows={1}
        style={{ wordBreak: "break-word" }}
        onInput={useAutoResizeTextarea}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <div className="flex flex-row-reverse justify-start items-center w-full h-fit gap-2.5">
        <SearchIcon
          width={36}
          height={36}
          strokeColor="#8C8C8C"
          className="p-1 rounded-full cursor-pointer hover:bg-toggleInactive transition-color duration-300"
          onClick={handleSubmit}
        />
        <ClipIcon
          width={36}
          height={36}
          strokeColor="#8C8C8C"
          className="p-1 rounded-full cursor-pointer hover:bg-toggleInactive transition-color duration-300"
          onClick={handleAttachImage}
        />
      </div>
    </section>
  );
};

export default ChatInput;
