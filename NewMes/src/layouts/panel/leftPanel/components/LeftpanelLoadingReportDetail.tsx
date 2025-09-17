import EditIcon from "@assets/icons/EditIcon";

import DetailBox from "@components/box/DetailBox";
import Unavailable from "@components/unavailable/Unavailable";

const LeftPanelLoadingReportDetail = () => {
  return (
    <section className="flex-1 flex flex-col w-full h-full px-6 pb-4 gap-4 overflow-y-auto text-white">
      <section className="flex w-full h-fit gap-4">
        <figure className="relative w-1/2 aspect-[16/17] rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          <span className="absolute top-3 right-3">
            <EditIcon width={24} height={24} strokeColor="#fff" className="rounded-full hover:bg-toggleInactive" />
          </span>
        </figure>

        <section className="flex-1 flex flex-col h-full gap-4 justify-between items-center">
          <DetailBox type="text" size="full" title="Patient Information" detail={""} />
          <DetailBox type="text" size="full" title="Patient Information" detail={""} />
        </section>
      </section>

      <Unavailable type="loading" content={"Detail Report"} />
    </section>
  );
};

export default LeftPanelLoadingReportDetail;
