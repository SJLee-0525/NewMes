import "@components/modal/Modal.css";

import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import useModalStore from "@stores/modalStore";

import CloseIcon from "@assets/icons/CloseIcon";

const Modal = () => {
  const { isOpen, isClosing, modalContent, closeModal } = useModalStore();

  const dialog = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isClosing) return;

    if (isOpen && dialog.current) {
      dialog.current.showModal();
    } else if (!isOpen && dialog.current) {
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
  }, [isOpen, isClosing]);

  // useEffect(() => {
  //   if (isOpen) {
  //     const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  //     document.body.style.overflow = "hidden";
  //     if (scrollBarWidth > 0) {
  //       document.body.style.paddingRight = `${scrollBarWidth}px`;
  //     }
  //   } else {
  //     document.body.style.overflow = "";
  //     document.body.style.paddingRight = "";
  //   }
  //   return () => {
  //     document.body.style.overflow = "";
  //     document.body.style.paddingRight = "";
  //   };
  // }, [isOpen]);

  if (!modalContent) return null;

  return createPortal(
    <dialog
      ref={dialog}
      onClose={() => {
        if (isOpen || isClosing) {
          closeModal();
        }
      }}
      onClick={(event) => {
        if (dialog.current && event.target === dialog.current) {
          closeModal();
        }
      }}
      className={`modal z-50 w-full max-w-140 h-fit min-h-22 max-h-[90vh] bg-dark rounded-3xl ring ring-border/60 ${isClosing ? "is-closing" : ""}`}
    >
      <button
        className="absolute top-5.5 right-5.5 w-11 h-11 z-60 rounded-full cursor-pointer bg-transparent transition-all duration-300 ease-in-out flex justify-center items-center hover:bg-red-500 focus:outline-none"
        onClick={closeModal}
      >
        <CloseIcon />
      </button>

      <section
        ref={contentRef}
        className="relative w-full h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {modalContent}
      </section>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
