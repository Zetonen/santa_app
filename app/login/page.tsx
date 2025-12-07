"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation"; // Router тут більше не потрібен для редіректу
import api, { loginAnswerI } from "../api";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  // const clearAuth = useAuthStore((state) => state.clearAuth); // AuthGuard сам почистить, якщо щось не так

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data: loginAnswerI = await api.login(username, password);

      if (!data.token) {
        throw new Error("Token missing");
      }

      // 1. Граємо музику
      const audio = document.getElementById(
        "xmas-audio-player"
      ) as HTMLAudioElement | null;
      if (audio) audio.play().catch(console.error);

      // 2. Оновлюємо стейт.
      // ЯК ТІЛЬКИ це станеться, AuthGuard (у RootLayout) побачить token
      // і сам перекине на /recipient.
      setAuth(data);
    } catch (err) {
      console.error(err);
      setError("Невірний логін або пароль. Спробуйте santa / hohoho");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white max-w-[600px] p-8 md:p-12 rounded-xl shadow-2xl border-5 border-[#ffd700] text-gray-800 backdrop-blur-sm w-full">
      <h1 className="text-[#C53A3A] text-[2em] drop-shadow-[2px_2px_0_#32CD32] mb-[30px] font-extrabold text-center">
        🎁 Вхід до Таємного Санти
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Логін (santa)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-3 border-2 focus:border-[#C53A3A] border-[#32CD32] rounded-lg bg-black text-white"
        />

        <input
          type="password"
          placeholder="Пароль (hohoho)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border-2 focus:border-[#C53A3A] border-[#32CD32] rounded-lg bg-black text-white"
        />

        {error && (
          <p className="text-[#C53A3A] font-semibold text-center mt-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="p-3 border-2 outline-none rounded-lg text-white bg-[#32CD32] font-bold cursor-pointer hover:bg-[#2db62d] transition-colors disabled:opacity-70"
        >
          {isLoading ? "Перевіряємо..." : "Дізнатися, кому дарувати!"}
        </button>
      </form>
    </div>
  );
}
