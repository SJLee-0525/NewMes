import ChatInput from "@components/input/ChatInput";
const NewChat = () => {
  async function handleSubmit({ message, images }: { message: string; images: File[] | null }) {
    console.log("New chat message submitted:", message, images);
  }

  return (
    <div className="w-full h-full flex justify-center items-start pt-[20vh]">
      <div className="animate-fade-in flex flex-col justify-center items-center w-5/6 h-fit gap-12">
        <h1 className="font-pre-bold text-5xl text-white text-center " style={{ lineHeight: "1.3" }}>
          Your AI Partner in Radiology,
          <br />
          radiXpert
        </h1>

        <section className="w-full max-w-240 h-fit">
          <ChatInput onSubmit={handleSubmit} />
        </section>
      </div>
    </div>
  );
};

export default NewChat;
