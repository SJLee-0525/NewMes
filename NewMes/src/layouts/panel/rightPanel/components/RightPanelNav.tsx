import MinimizeIcon from "@assets/icons/MinimizeIcon";

import useSystemStore from "@stores/systemStore";

const RightPanelNav = () => {
  const { toggleRightSidebar } = useSystemStore();

  return (
    <nav className="flex justify-between items-center w-full h-fit px-6 py-4">
      <h2 className="text-2xl text-icon font-pre-medium">Patients</h2>

      <MinimizeIcon
        width={24}
        height={24}
        strokeColor="#ffffff"
        strokeWidth={2.5}
        onClick={() => toggleRightSidebar(false)}
      />
    </nav>
  );
};

export default RightPanelNav;
