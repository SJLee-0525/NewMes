interface PriceBoxProps {
  name: string;
  price: string;
  features: string[];
  isCurrentPlan: boolean;
  onSelectPlan: () => void;
}

const PriceBox = ({ name, price, features, isCurrentPlan, onSelectPlan }: PriceBoxProps) => {
  const buttonColor = isCurrentPlan
    ? "bg-mainPurple text-[#fff]"
    : "bg-toggleInactive text-[#fff] hover:bg-mainPurple/75";

  return (
    <section
      className={`flex flex-col justify-start items-start w-full max-w-100 h-full max-h-140 p-6 gap-10 rounded-xl bg-inactive border ${isCurrentPlan ? "border-mainPurple" : "border-transparent hover:border-mainPurple/70"} transition-all duration-300`}
    >
      <h2 className="font-pre-bold text-3xl text-white">{name}</h2>

      <section className="flex flex-col items-start w-full h-fit">
        <p className="flex items-start gap-1 font-pre-light">
          <span className="text-icon">$</span>
          <span className="text-white text-5xl">{price}</span>
          <span className="self-end text-icon text-xs ml-1">
            USD /<br /> 월
          </span>
        </p>
      </section>

      <button
        className={`w-full h-fit py-2 font-pre-medium rounded-full ${buttonColor} transition-all duration-300 cursor-pointer`}
        onClick={onSelectPlan}
      >
        {isCurrentPlan ? "현재 나의 플랜" : `${name} 사용하기`}
      </button>

      <ul className="font-pre-medium space-y-2.5 list-disc list-inside marker:text-white marker:text-base">
        {features.map((feature, index) => (
          <li key={index} className="text-white">
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PriceBox;
