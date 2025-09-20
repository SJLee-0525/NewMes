import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  isClosing: boolean;
  modalContent: React.ReactNode | null;
  openModal: ({ modalContent }: { modalContent: React.ReactNode }) => void;
  closeModal: () => void;

  photoModalIsOpen: boolean;
  photoModalIsClosing: boolean;
  photoModalContent: React.ReactNode | null;
  openPhotoModal: ({ modalContent }: { modalContent: React.ReactNode }) => void;
  closePhotoModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  isClosing: false,
  modalContent: null,
  openModal: ({ modalContent }) => {
    set({ isOpen: true, isClosing: false, modalContent });
  },
  closeModal: () => {
    set({ isClosing: true });

    setTimeout(() => {
      set({ isOpen: false, isClosing: false, modalContent: null });
    }, 300);
  },

  photoModalIsOpen: false,
  photoModalIsClosing: false,
  photoModalContent: null,
  openPhotoModal: ({ modalContent }) => {
    set({ photoModalIsOpen: true, photoModalIsClosing: false, photoModalContent: modalContent });
  },
  closePhotoModal: () => {
    set({ photoModalIsClosing: true });

    setTimeout(() => {
      set({ photoModalIsOpen: false, photoModalIsClosing: false, photoModalContent: null });
    }, 500);
  },
}));

export default useModalStore;
