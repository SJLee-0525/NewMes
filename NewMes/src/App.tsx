import "@/App.css";

import MainLayout from "@layouts/MainLayout";
import PhotoModal from "@components/modal/PhotoModal";

const App = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <MainLayout />

      <PhotoModal />
    </div>
  );
};

export default App;
