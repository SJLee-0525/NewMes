interface HelpBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

const HelpBox = ({ icon, title, description, onClick }: HelpBoxProps) => {
  return (
    <section
      className="flex flex-col justify-between items-start w-full h-full p-8 gap-6 rounded-xl bg-inactive border border-transparent hover:border-mainPurple/70 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <header className="flex flex-col items-center w-full h-fit gap-6">
        {icon}
        <h2 className="flex items-center gap-2 font-pre-bold text-2xl text-white mb-4">{title}</h2>
      </header>

      <p className="w-full font-pre-regular text-center text-icon mb-2">{description}</p>
    </section>
  );
};

export default HelpBox;
