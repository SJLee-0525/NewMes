import "@components/modal/Modal.css";

import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import useModalStore from "@stores/modalStore";

const PhotoModal = () => {
  const { photoModalIsOpen, photoModalIsClosing, photoModalContent, closePhotoModal } = useModalStore();

  const dialog = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (photoModalIsClosing) return;

    if (photoModalIsOpen && dialog.current) {
      dialog.current.showModal();
    } else if (!photoModalIsOpen && dialog.current) {
      dialog.current.close();
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    };
  }, [photoModalIsOpen, photoModalIsClosing]);

  return createPortal(
    <dialog
      ref={dialog}
      onClose={() => {
        if (photoModalIsOpen || photoModalIsClosing) {
          closePhotoModal();
        }
      }}
      onClick={(event) => {
        if (dialog.current && event.target === dialog.current) {
          closePhotoModal();
        }
      }}
      className={`photo-modal z-50 w-screen h-screen ${photoModalIsClosing ? "is-closing" : ""}`}
      style={{ width: "100vw", height: "100vh", maxWidth: "100vw", maxHeight: "100vh", margin: 0, padding: 0 }}
    >
      {photoModalContent && <>{photoModalContent}</>}
    </dialog>,
    document.getElementById("photo-modal-root") as HTMLElement
  );
};

export default PhotoModal;
