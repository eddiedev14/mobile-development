import ProfilePicture from "/profile-picture.png";
import { useLoginForm } from "../hooks/auth/useLoginForm";

export const LoginForm = () => {
  const { handleLogin } = useLoginForm();

  return (
    <main className="flex flex-col items-center gap-2 w-md border border-gray-300 rounded-xl p-6">
      <img
        src={ProfilePicture}
        alt="Profile Picture"
        className="object-cover size-32"
      />
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="font-light text-sm">
        Inicia Sesión para practicar con los challenges
      </p>

      <form onSubmit={handleLogin} className="w-full mt-2 flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            placeholder="e.g. user@mail.com"
            type="email"
            className="p-2 rounded-md border border-gray-800"
          ></input>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            className="p-2 rounded-md border border-gray-800"
          ></input>
        </div>

        <button
          type="submit"
          className="bg-green-600 py-2 cursor-pointer rounded-md text-white"
        >
          Iniciar Sesión
        </button>
      </form>
    </main>
  );
};
