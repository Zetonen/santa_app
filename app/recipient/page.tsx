"use client";
import Image from "next/image";
import BackgroundEffects from "../components/BackgroundEffects";
import { useAuthStore } from "../store/useAuthStore";

export default function RecipientPage() {
  const recipient = useAuthStore((state) => state.user?.recipient);

  return (
    <>
      <BackgroundEffects />
      <div className="absolute w-[100%] max-w-[800px] flex justify-center items-center p-5">
        <div className="w-[100%] shadow-xl shadow-gray-700/50 shadow-inner border-4 border-solid border-yellow-500 bg-[#fffffff2] p-10 rounded-2xl text-center">
          <h1 className="text-[#C53A3A] text-[1.3em] md:text-[2em] drop-shadow-[2px_2px_0_#32CD32] mb-[10px] md:mb-[30px] font-extrabold text-center">
            🎉 Твій Таємний Одержувач 🎉
          </h1>

          {recipient ? (
            <>
              <div className="flex justify-center">
                <Image
                  loading="eager"
                  alt="santa recipient"
                  src={recipient?.userImg}
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-[180px] lg:max-w-[400px] mb-[10px] md:mb-[30px] shadow-xl shadow-gray-700/50 border-[5px] border-solid border-[#C53A3A] transition duration-500 ease-in-out hover:scale-110 hover:rotate-[360deg]"
                />
              </div>
              <h2 className="text-[#C53A3A] text-[1.3em] md:text-[2em] mb-[10px]">
                {recipient?.name}
              </h2>
              <blockquote className="p-2.5 bg-[#ffffff80] text-[#333] border-l-5 border-l-yellow-500">
                «{recipient?.quote}»
              </blockquote>
            </>
          ) : (
            <p className="text-[1.5em] font-bold">{"Поки не обраний >_<"}</p>
          )}
        </div>
      </div>
      {/* Картка отримувача */}
    </>
  );
}
