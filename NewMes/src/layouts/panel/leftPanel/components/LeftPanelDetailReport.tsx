import { useState, useEffect } from "react";

import { getReportDetailApi } from "@apis/userApi";

import type { Report } from "@/types/reportsType";

import DetailBox from "@components/box/DetailBox";
import EditIcon from "@assets/icons/EditIcon";

import tempImg from "@datas/cxr_image/cxr_01.jpg";

const LeftPanelDetailReport = ({ selectedReportId }: { selectedReportId: number }) => {
  const [reportDetail, setReportDetail] = useState<Report | null>(null);

  useEffect(() => {
    async function fetchReportDetail() {
      try {
        const data = await getReportDetailApi(selectedReportId);
        setReportDetail(data);
      } catch (error) {
        console.error("Error fetching report detail:", error);
      }
    }

    fetchReportDetail();
  }, [selectedReportId]);

  if (!reportDetail) {
    return <div className="text-white">Loading report details...</div>;
  }

  return (
    <section className="flex-1 flex flex-col w-full h-full px-6 pb-4 gap-4 overflow-y-auto text-white">
      <section className="flex w-full h-fit gap-4">
        <figure className="relative max-w-1/2 aspect-[16/17] rounded-xl overflow-hidden">
          <img src={tempImg} alt="temp" className="w-full h-full object-cover" />
          <span className="absolute top-3 right-3">
            <EditIcon width={24} height={24} strokeColor="#fff" className="rounded-full hover:bg-toggleInactive" />
          </span>
        </figure>

        <section className="flex-1 flex flex-col h-full gap-4 justify-between items-center">
          <DetailBox
            type="list"
            size="full"
            title="Patient Information"
            detail={{
              Age: reportDetail.age,
              Gender: reportDetail.gender,
              "Shooting Date": reportDetail.shootingDate,
            }}
          />
          <DetailBox
            type="list"
            size="full"
            title="Diagnosis"
            detail={{
              Disease: reportDetail.disease,
              Location: reportDetail.location,
              Size: reportDetail.size,
              Symptoms: reportDetail.symptoms,
            }}
          />
        </section>
      </section>

      <DetailBox type="text" size="fit" title="Brief summary" detail={reportDetail.briefSummary} />
      <DetailBox type="text" size="fit" title="Finding" detail={reportDetail.finding} />
    </section>
  );
};

export default LeftPanelDetailReport;
