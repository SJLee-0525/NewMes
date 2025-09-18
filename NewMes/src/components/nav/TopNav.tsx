import TopNavLeft from "@components/nav/components/TopNavLeft";
import TopNavButtons from "@components/nav/components/TopNavButtons";
import TopNavButton from "@components/button/TopNavButton";

import useAuthStore from "@stores/authStore";

const TopNav = () => {
  const { deleteUser } = useAuthStore();

  function handleLogOut() {
    deleteUser();
    window.location.reload();
  }

  return (
    <nav className="flex justify-between items-center w-full h-[100px] border-b border-b-border">
      <TopNavLeft />

      <section className="flex-1 flex justify-between items-center w-full h-full p-8 gap-6">
        <span />
        <TopNavButtons />
        <TopNavButton label="LOG OUT" onClick={handleLogOut} />
      </section>
    </nav>
  );
};

export default TopNav;
