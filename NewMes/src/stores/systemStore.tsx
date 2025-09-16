import React from "react";

import { create } from "zustand";

interface SystemState {
  isOpen: boolean;
  isClosing: boolean;
  loadingContent: React.ReactNode | null;
  modalContent: React.ReactNode | null;
  openModal: ({
    loadingContent,
    modalContent,
  }: {
    loadingContent: React.ReactNode;
    modalContent: React.ReactNode;
  }) => void;
  closeModal: () => void;

  leftSidebarOpen: boolean;
  toggleLeftSidebar: () => void;

  leftSidebarSelectedTab: "chat" | "report";
  setLeftSidebarSelectedTab: (tab: "chat" | "report") => void;

  selectedSessionId: number | null;
  setSelectedSessionId: (sessionId: number | null) => void;
}

const useSystemStore = create<SystemState>((set) => ({
  isOpen: false,
  isClosing: false,
  loadingContent: null,
  modalContent: null,
  openModal: ({ loadingContent, modalContent }) => {
    set({ isOpen: true, isClosing: false, loadingContent, modalContent });
  },
  closeModal: () => {
    set({ isClosing: true });

    setTimeout(() => {
      set({ isOpen: false, isClosing: false, loadingContent: null, modalContent: null });
    }, 300);
  },

  leftSidebarOpen: true,
  toggleLeftSidebar: () => set((state) => ({ leftSidebarOpen: !state.leftSidebarOpen })),

  leftSidebarSelectedTab: "chat",
  setLeftSidebarSelectedTab: (tab) => set({ leftSidebarSelectedTab: tab }),

  selectedSessionId: null,
  setSelectedSessionId: (sessionId) => set({ selectedSessionId: sessionId }),
}));

export default useSystemStore;
