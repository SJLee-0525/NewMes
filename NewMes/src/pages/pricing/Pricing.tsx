import { useState } from "react";

import PriceBox from "@components/box/PriceBox";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro">("free");

  return (
    <section className="flex flex-col w-full h-full p-4">
      <h1 className="text-3xl font-bold p-2 text-white">Upgrade Plan</h1>

      <section className="flex justify-center items-center w-full h-full gap-8">
        <PriceBox
          name="Free"
          price="0"
          features={["기본 기능 제공", "월 100건 뉴스 요약", "기본 지원"]}
          isCurrentPlan={selectedPlan === "free"}
          onSelectPlan={() => setSelectedPlan("free")}
        />
        <PriceBox
          name="Pro"
          price="12.9"
          features={[
            "모든 기본 기능 포함",
            "제한 없는 메시지 및 업로드",
            "월 1000건 뉴스 요약",
            "우선 지원",
            "커스텀 뉴스 소스 추가",
          ]}
          isCurrentPlan={selectedPlan === "pro"}
          onSelectPlan={() => setSelectedPlan("pro")}
        />
      </section>

      <footer className="mb-2">
        <p className="font-pre-regular text-xs text-center text-icon">
          현재는 데모 버전으로, 실제 결제 시스템은 구현되어 있지 않습니다. Pro 플랜 선택 시 기능이 활성화되는 것처럼
          보이지만, 실제로는 무료 플랜과 동일하게 동작합니다.
        </p>
      </footer>
    </section>
  );
};

export default Pricing;
