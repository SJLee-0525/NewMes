import RightPanelNav from "@layouts/panel/rightPanel/components/RightPanelNav";
import RightPanelPatientsContainer from "@layouts/panel/rightPanel/components/RightPanelPatientsContainer";

const RightPanel = ({ isOpen }: { isOpen: boolean }) => {
  const rightWidth = isOpen ? "w-1/5 min-w-88" : "w-0 min-w-0";

  return (
    <aside className={`${rightWidth} h-full pr-6 py-4 transition-all duration-300`}>
      <section className="flex flex-col justify-between items-center bg-inactive w-full h-full rounded-xl">
        {isOpen && (
          <>
            <RightPanelNav />
            <RightPanelPatientsContainer />
          </>
        )}
      </section>
    </aside>
  );
};

export default RightPanel;
