import React from "react";

import { create } from "zustand";

import type { Image } from "@/types/patientsType";

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

  selectedReportId: { id: number | null; name: string | null };
  setSelectedReportId: (reportId: number | null, patientName: string | null) => void;

  rightSidebarOpen: boolean;
  toggleRightSidebar: (bool: boolean) => void;

  selectedPatientId: { id: string | null; images: Image[] };
  setSelectedPatientId: (patientId: string | null, images: Image[]) => void;
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
  setLeftSidebarSelectedTab: (tab) => {
    set({ leftSidebarSelectedTab: tab, selectedReportId: { id: null, name: null } });
  },

  selectedSessionId: null,
  setSelectedSessionId: (sessionId) => set({ selectedSessionId: sessionId }),

  selectedReportId: { id: null, name: null },
  setSelectedReportId: (reportId, patientName) => {
    if (reportId === null || patientName === null) set({ selectedReportId: { id: null, name: null } });
    else set({ selectedReportId: { id: reportId, name: patientName } });
  },

  rightSidebarOpen: false,
  toggleRightSidebar: (bool) => set({ rightSidebarOpen: bool }),

  selectedPatientId: { id: null, images: [] },
  setSelectedPatientId: (patientId, images) => set({ selectedPatientId: { id: patientId, images } }),
}));

export default useSystemStore;
