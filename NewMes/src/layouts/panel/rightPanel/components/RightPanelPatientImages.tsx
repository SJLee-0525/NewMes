import type { Image, PatientListItem } from "@/types/patientsType";

import ToggleIcon from "@assets/icons/ToggleIcon";
import PhotoIcon from "@assets/icons/PhotoIcon";

import useSystemStore from "@stores/systemStore";

const RightPanelPatientImages = ({
  id,
  images,
  isExpanded,
}: {
  id: string;
  images: PatientListItem["images"];
  isExpanded: boolean;
}) => {
  const { selectedPatientId, setSelectedPatientId } = useSystemStore();

  function handleSelectAll() {
    if (!images || images.length === 0) return;

    if (selectedPatientId.id === id && selectedPatientId.images.length === images.length)
      setSelectedPatientId(id, []); // 초기화
    else setSelectedPatientId(id, images); // 모두 선택
  }

  function handleSelectImage(image: Image) {
    if (selectedPatientId.id === id) {
      const isAlreadySelected = selectedPatientId.images.some((img) => img.id === image.id);
      const newImages = isAlreadySelected
        ? selectedPatientId.images.filter((img) => img.id !== image.id)
        : [...selectedPatientId.images, image];

      setSelectedPatientId(id, newImages);
    } else {
      setSelectedPatientId(id, [image]);
    }
  }

  return (
    <section
      className={`w-4/5 ${isExpanded ? "max-h-100" : "max-h-0 overflow-hidden"} pl-2 transition-all duration-300`}
    >
      {images && images.length > 0 ? (
        <div className="flex flex-col justify-between items-center w-full h-fit gap-2">
          <header className="flex justify-between items-start w-full h-fit pt-2">
            <h3 className="font-pre-medium text-lg text-icon">Select images</h3>
            <button className="font-pre-regular text-sm text-icon hover:underline" onClick={handleSelectAll}>
              All
            </button>
          </header>

          {images.map((image) => (
            <div
              key={image.id}
              className="flex justify-start items-center w-full h-fit gap-1 hover:bg-toggleInactive/35 rounded-full cursor-pointer transition-all duration-300"
              onClick={() => handleSelectImage(image)}
            >
              <ToggleIcon
                width={24}
                height={24}
                strokeColor={selectedPatientId.images.some((img) => img.id === image.id) ? "#5856D6" : "#ffffff"}
                className="p-1"
                isSelected={selectedPatientId.images.some((img) => img.id === image.id)}
              />
              <PhotoIcon width={20} height={20} strokeColor="#ffffff" className="" />
              <span className="font-pre-semi-bold text-sm text-white whitespace-nowrap">
                {image.filename}
                <small className="ml-3 text-icon">({image.date})</small>
              </span>
            </div>
          ))}

          <section className="flex justify-end items-center w-full h-fit py-2">
            <button
              className="px-4 py-0.5 rounded-full font-pre-semi-bold text-white text-sm"
              style={{
                background: "linear-gradient(to bottom, #5856D6, #3822FF)",
              }}
            >
              Load image
            </button>
          </section>
        </div>
      ) : (
        <p className="text-white">No images available.</p>
      )}
    </section>
  );
};

export default RightPanelPatientImages;
