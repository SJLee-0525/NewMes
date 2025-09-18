import useAuthStore from "@stores/authStore";

const Login = () => {
  const { setUserName } = useAuthStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries());

    const user = {
      userEmail: data.email as string,
    };

    setUserName(user);

    window.location.reload();
  }

  return (
    <section className="login flex flex-col justify-center items-center w-full h-full gap-12 text-white">
      <h1 className="font-pre-bold text-5xl text-white text-center " style={{ lineHeight: "1.3" }}>
        Your AI Partner in Radiology,
        <br />
        radiXpert
      </h1>

      <form className="flex flex-col gap-3 w-108 max-w-[80vw] h-fit" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="px-4 py-2.5 font-pre-regular text-icon bg-inactive rounded-lg"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="px-4 py-2.5 font-pre-regular text-icon bg-inactive rounded-lg"
        />

        <button
          className="mt-2 py-2.5 font-pre-semi-bold text-white bg-mainPurple hover:bg-indigo-600 transition-color duration-300 rounded-lg cursor-pointer"
          type="submit"
        >
          로그인
        </button>
      </form>
    </section>
  );
};

export default Login;
