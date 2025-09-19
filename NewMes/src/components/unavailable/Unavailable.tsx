const Unavailable = ({ type, content }: { type: "loading" | "error"; content: string }) => {
  return (
    <section className="animate-fade-in flex w-full h-full justify-center items-start">
      {type === "loading" && (
        <i className="py-[30%] font-pre-medium text-unavailable text-center break-words">Loading {content}...</i>
      )}
      {type === "error" && (
        <i className="py-[30%] font-pre-medium text-unavailable text-center break-words">
          {content} is unavailable.
          <br />
          We're working to restore this feature as soon as possible.
        </i>
      )}
    </section>
  );
};

export default Unavailable;
