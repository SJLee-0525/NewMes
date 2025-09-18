import { create } from "zustand";

interface ModalState {
  photoModalIsOpen: boolean;
  photoModalIsClosing: boolean;
  photoModalContent: React.ReactNode | null;
  openPhotoModal: ({ modalContent }: { modalContent: React.ReactNode }) => void;
  closePhotoModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
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
