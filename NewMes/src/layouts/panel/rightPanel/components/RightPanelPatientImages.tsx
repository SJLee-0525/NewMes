import { useState, type MouseEvent } from "react";

import type { PatientListItem, Image } from "@/types/patientsType";
import type { PreviewProps } from "@/types/componentsProps";

import Preview from "@components/preview/Preview";

import ToggleIcon from "@assets/icons/ToggleIcon";
import PhotoIcon from "@assets/icons/PhotoIcon";

import useSystemStore from "@stores/systemStore";

import tempImg1 from "@datas/cxr_image/cxr_01.jpg";
import tempImg2 from "@datas/cxr_image/cxr_02.jpeg";
import tempImg3 from "@datas/cxr_image/cxr_03.jpeg";

const TEMP_IMAGES = [tempImg1, tempImg2, tempImg3];

const RightPanelPatientImages = ({
  id,
  name,
  images,
  isExpanded,
}: {
  id: string;
  name: string;
  images: PatientListItem["images"];
  isExpanded: boolean;
}) => {
  const { selectedPatientId, setSelectedPatientId } = useSystemStore();

  // 미리보기 상태
  const [preview, setPreview] = useState<PreviewProps | null>(null);

  // 이미지 전체 선택 / 해제
  function handleSelectAll() {
    if (!images || images.length === 0) return;

    if (selectedPatientId.id === id && selectedPatientId.images.length === images.length)
      setSelectedPatientId(id, name, []);
    else setSelectedPatientId(id, name, images); // 모두 선택
  }

  // 개별 이미지 선택 / 해제
  function handleSelectImage(image: Image) {
    // 동일 환자 내에서 선택된 이미지라면, 선택된 이미지 목록에서 추가/제거
    if (selectedPatientId.id === id) {
      const isAlreadySelected = selectedPatientId.images.some((img) => img.id === image.id);
      const newImages = isAlreadySelected
        ? selectedPatientId.images.filter((img) => img.id !== image.id)
        : [...selectedPatientId.images, image];

      setSelectedPatientId(id, name, newImages);
    } else setSelectedPatientId(id, name, [image]); // 다른 환자에서 선택된 이미지라면, 선택된 환자를 바꾸고 해당 이미지를 선택
  }

  // 미리보기 핸들러
  function handleMouseEnter(e: MouseEvent, image: Image, idx: number) {
    if (!image) return;

    setPreview({
      url: TEMP_IMAGES[idx % 3] || image.filename, // url: image.filePath 등으로 추후 실제 경로로 교체
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handleMouseMove(e: MouseEvent) {
    setPreview((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : null));
  }

  function handleMouseLeave() {
    setPreview(null);
  }

  // 파일탐색기 열기
  function handleLoadImages() {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        // 파일 처리 로직 추가
        console.log("Selected files:", files);
      }
    };
    input.click();
  }

  return (
    <section className={`toggle-fade-in w-4/5 ${isExpanded ? "block" : "hidden"} pl-2 transition-all duration-300`}>
      {images && images.length > 0 ? (
        <div className="flex flex-col justify-between items-center w-full h-fit gap-2">
          <header className="flex justify-between items-center w-full h-fit pt-2">
            <h3 className="font-pre-medium text-lg text-icon">Select images</h3>
            <button
              className="px-1 py-0.5 font-pre-regular text-sm text-icon hover:bg-border rounded-md transition-color duration-300 cursor-pointer"
              onClick={handleSelectAll}
            >
              All
            </button>
          </header>

          {images.map((image, idx) => (
            <div
              key={image.id}
              className="flex justify-start items-center w-full h-fit gap-1 hover:bg-toggleInactive/35 rounded-full cursor-pointer transition-all duration-300"
              onClick={() => handleSelectImage(image)}
              onMouseEnter={(e) => handleMouseEnter(e, image, idx)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <ToggleIcon
                width={24}
                height={24}
                strokeColor={selectedPatientId.images.some((img) => img.id === image.id) ? "#5856D6" : ""}
                className="p-1"
                isSelected={selectedPatientId.images.some((img) => img.id === image.id)}
              />
              <PhotoIcon width={20} height={20} className="" />
              <span className="font-pre-semi-bold text-sm text-white whitespace-nowrap">
                {image.filename}
                <small className="ml-3 text-icon">({image.date})</small>
              </span>
            </div>
          ))}

          {/* 호버 시 이미지 미리보기 */}
          {preview && <Preview type="image" preview={preview} />}

          <section className="flex justify-end items-center w-full h-fit py-2">
            <button
              className="px-4 py-0.5 rounded-full font-pre-semi-bold text-white text-sm cursor-pointer"
              style={{
                background: "linear-gradient(to bottom, #5856D6, #3822FF)",
              }}
              onClick={handleLoadImages}
            >
              Load image
            </button>
          </section>
        </div>
      ) : (
        <i className="font-pre-medium text-icon text-center break-words">No images available.</i>
      )}
    </section>
  );
};

export default RightPanelPatientImages;
