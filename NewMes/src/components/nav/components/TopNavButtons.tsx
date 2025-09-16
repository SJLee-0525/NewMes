import { useNavigate } from "react-router-dom";

import TopNavButton from "@components/button/TopNavButton";

const TopNavButtons = () => {
  const navigate = useNavigate();

  const buttons = ["PATIENTS", "DASHBOARD", "PRICING", "HELP"];

  function handleClick(label: string) {
    switch (label) {
      case "DASHBOARD":
        navigate("/dashboard");
        break;

      case "PRICING":
        navigate("/pricing");
        break;

      case "HELP":
        navigate("/help");
        break;

      default:
        navigate("/");
        break;
    }
  }

  return (
    <section className="flex justify-between items-center w-fit h-fit gap-4">
      {buttons.map((button, idx) => (
        <TopNavButton key={`${button}+${idx}`} label={button} onClick={handleClick} />
      ))}
    </section>
  );
};

export default TopNavButtons;
