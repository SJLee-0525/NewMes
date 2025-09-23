import EditIcon from "@assets/icons/EditIcon";

interface DetailBoxProps {
  type: "list" | "text";
  size: "fit" | "full";
  title: string;
  detail: string | { [key: string]: string | number };
}

const DetailBox = ({ type, size, title, detail }: DetailBoxProps) => {
  return (
    <span
      className={`detail-box flex flex-col justify-between items-center w-full ${size === "full" ? "h-full" : "h-fit"} px-4 py-3 gap-2 rounded-xl bg-inactive `}
    >
      <header className="flex justify-between items-start w-full min-h-10">
        <h3 className="w-full h-fit font-pre-semi-bold text-title text-left whitespace-nowrap">{title}</h3>
        <EditIcon width={24} height={24} strokeColor="#8C8C8C" className="rounded-full hover:bg-toggleInactive" />
      </header>

      <section className="flex flex-col justify-center items-start w-full h-full">
        {type === "list" ? (
          <ul className="w-full h-fit font-pre-semi-bold space-y-1 list-disc list-inside marker:text-white marker:text-base">
            {Object.entries(detail as { [key: string]: string | number }).map(([key, value]) => (
              <li key={key} className="pl-1">
                {key} :{" "}
                {key === "Disease" ? (
                  <span className="px-1.5 border-2 border-disease1 bg-disease2 rounded-full text-disease1 text-sm whitespace-nowrap">
                    {value}
                  </span>
                ) : (
                  value
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-pre-regular text-white text-left">{detail as string}</p>
        )}
      </section>
    </span>
  );
};

export default DetailBox;
