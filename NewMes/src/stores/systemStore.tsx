import { create } from "zustand";

import type { Image } from "@/types/patientsType";

interface SystemState {
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

  selectedPatientId: { id: string | null; name: string | null; images: Image[] };
  setSelectedPatientId: (patientId: string | null, patientName: string | null, images: Image[]) => void;
}

const useSystemStore = create<SystemState>((set) => ({
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

  selectedPatientId: { id: null, name: null, images: [] },
  setSelectedPatientId: (patientId, patientName, images) =>
    set({ selectedPatientId: { id: patientId, name: patientName, images } }),
}));

export default useSystemStore;
