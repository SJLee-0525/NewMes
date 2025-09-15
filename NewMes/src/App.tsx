import "@/App.css";

import reactLogo from "@assets/react.svg";
import viteLogo from "/vite.svg";

import SearchIcon from "@assets/icons/SearchIcon";

const App = () => {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <SearchIcon strokeColor="white" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-pre-medium text-white">Vite + React</h1>
      <div className="card">
        <p className="font-pre-bold text-active">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-disease1">Click on the Vite and React logos to learn more</p>
    </>
  );
};

export default App;
