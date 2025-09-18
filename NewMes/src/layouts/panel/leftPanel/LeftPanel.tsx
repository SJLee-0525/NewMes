import { useRef } from "react";

import { DETAIL_REPORT_PRINT_STYLE } from "@styles/print";

import LeftPanelNav from "@layouts/panel/leftPanel/components/LeftPanelNav";
import LeftPanelChattingHistory from "@layouts/panel/leftPanel/components/LeftPanelChattingHistory";
import LeftPanelReportHistory from "@layouts/panel/leftPanel/components/LeftPanelReportHistory";

import useSystemStore from "@stores/systemStore";

const LeftPanel = ({ isOpen }: { isOpen: boolean }) => {
  const printAreaRef = useRef<HTMLElement>(null);

  const { leftSidebarSelectedTab, selectedReportId } = useSystemStore();

  function handlePrint() {
    const printContent = printAreaRef.current;

    if (printContent) {
      // 새 창 열기 (가로 800px, 세로 600px)
      const printWindow = window.open("", "_blank", "width=800,height=600");

      if (!printWindow) {
        alert("팝업이 차단되었습니다. 팝업 차단을 해제해주세요.");
        return;
      }

      // 문서 객체, 제목 설정
      const doc = printWindow.document;
      doc.title = `${selectedReportId.name}님 진단 보고서`;

      // 외부 CSS (안 불러와져서 추후 수정해야함.. 일단 인라인으로 강제)
      const link = doc.createElement("link");
      link.rel = "stylesheet";
      link.href = "/styles/print.css";
      doc.head.appendChild(link);

      // 인라인 스타일
      const style = doc.createElement("style");
      style.textContent = DETAIL_REPORT_PRINT_STYLE;
      doc.head.appendChild(style);

      // 본문
      doc.body.innerHTML = `
      <div id="print-area">
        <h1>${selectedReportId.name?.split(" ")[1]}님 진단 보고서</h1>
        ${printContent.innerHTML}
      </div>
      `;

      // 스타일 로딩 대기
      const waitForStyles = new Promise<void>((resolve) => {
        if ((link as any).sheet) return resolve(); // 이미 로드된 경우

        link.addEventListener("load", () => resolve(), { once: true });
        link.addEventListener("error", () => resolve(), { once: true }); // 실패해도 그냥 진행
      });

      // 이미지 로딩 대기
      const waitForImages = Promise.all(Array.from(doc.images).map((img) => img.decode().catch(() => {})));

      // 모두 준비되면 인쇄
      Promise.all([waitForStyles, waitForImages]).then(() => {
        printWindow.focus();
        printWindow.print();

        // 인쇄창 자동 닫기 (afterprint 지원 브라우저)
        printWindow.addEventListener?.("afterprint", () => printWindow.close());

        // 혹시 모를 케이스 대비 타임아웃으로 닫기
        setTimeout(() => {
          try {
            printWindow.close();
          } catch {}
        }, 500);
      });
    }
  }

  const leftWidth = !isOpen
    ? "w-0"
    : leftSidebarSelectedTab === "chat" || selectedReportId.id === null
      ? "w-1/4 min-w-60 border-r border-r-border"
      : "w-2/5 min-w-60 border-r border-r-border";

  return (
    <aside className={`flex flex-col ${leftWidth} h-full  transition-width duration-300`}>
      {isOpen && (
        <>
          <LeftPanelNav onPrint={handlePrint} />

          {leftSidebarSelectedTab === "report" && <LeftPanelReportHistory ref={printAreaRef} />}
          {leftSidebarSelectedTab === "chat" && <LeftPanelChattingHistory />}
        </>
      )}
    </aside>
  );
};

export default LeftPanel;
