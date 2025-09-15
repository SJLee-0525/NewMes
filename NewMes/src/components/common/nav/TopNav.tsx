import TopNavLeft from "@components/common/nav/components/TopNavLeft";
import TopNavButtons from "@components/common/nav/components/TopNavButtons";
import TopNavButton from "@components/button/TopNavButton";

const TopNav = () => {
  return (
    <nav className="flex justify-between items-center w-full h-[100px] border-b border-b-border">
      <TopNavLeft />

      <section className="flex-1 flex justify-between items-center w-full h-full p-8 gap-6">
        <span />
        <TopNavButtons />
        <TopNavButton label="LOG OUT" onClick={() => {}} />
      </section>
    </nav>
  );
};

export default TopNav;
