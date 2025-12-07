"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import honkai_Elysia from "../assets/images/gifs/honkai_Elysia.gif";
import chibi_Reina from "../assets/images/gifs/chibi_Reina.gif";
import chibi_Nezuko from "../assets/images/gifs/chibi_Nezuko.gif";
import chibi_BlondeGirl from "../assets/images/gifs/chibi_BlondeGirl.gif";
import chibi_rikka from "../assets/images/gifs/chibi_rikka.gif";
import pigeon from "../assets/images/gifs/pigeon.gif";
import duck from "../assets/images/gifs/duck.gif";
import grandmother from "../assets/images/gifs/grandmother.gif";
import dog from "../assets/images/gifs/dog.gif";
import donkey from "../assets/images/gifs/donkey.gif";
import pinyata from "../assets/images/gifs/pinyata.gif";
import girl from "../assets/images/gifs/girl.gif";
import rabbit from "../assets/images/gifs/rabbit.gif";
import plunger from "../assets/images/gifs/plunger.gif";
import danceBreakdance from "../assets/images/gifs/dance-breakdance.gif";



const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function BackgroundEffects() {
  const [snowflakes, setSnowflakes] = useState<any[]>([]);

  useEffect(() => {
    const runEffect = () => {
      // --- СНІГ ---
      const snowCount = 450;
      const newSnowflakes = Array.from({ length: snowCount }).map((_, i) => {
        return {
          id: i,
          left: `${random(0, 100)}vw`,
          animationDelay: `${random(0, 5)}s`,
          animationDuration: `${random(2, 6)}s`,
          size: `${random(0.8, 1.5)}rem`,
        };
      });
      setSnowflakes(newSnowflakes);
    };
    runEffect();
  }, []);

  return (
    <div className="fixed max-w-[1100px] mx-auto inset-0 pointer-events-none">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake text-white/70"
          style={{
            left: flake.left,
            animationDelay: flake.animationDelay,
            animationDuration: flake.animationDuration,
            fontSize: flake.size,
          }}
        >
          ❄
        </div>
      ))}
      <Image
        className="absolute bottom-0 left-0"
        alt="gits"
        src={honkai_Elysia}
      />
      <Image className="absolute top-[2vh] left-38" alt="gits" src={chibi_Reina} />
      <Image
        className="absolute top-10 right-48"
        alt="gits"
        src={chibi_Nezuko}
      />
      <Image
        className="absolute -bottom-5 right-38 rotate-180"
        alt="gits"
        src={chibi_BlondeGirl}
      />
      <Image
        className="absolute top-0 left-[50%] -translate-x-[50%]"
        alt="gits"
        src={chibi_rikka}
      />

      <Image
        className="chaos-wrapper absolute w-[100px] h-auto top-10 left-38"
        alt="gits"
        src={pigeon}
        style={{
          ["--start-y" as any]: "5vh",
          animationDelay: "1s",
          animationName: "chaos-path-1",
          animationDuration: "6s",
        }}
      />
      <Image
        className="chaos-wrapper absolute w-[100px] h-auto top-10 left-38"
        alt="gits"
        src={pigeon}
        style={{
          ["--start-y" as any]: "5vh",
          animationDelay: "3s",
          animationName: "chaos-path-1",
          animationDuration: "6s",
        }}
      />
      <Image className="absolute top-20 -rotate-25 -left-10" alt="gits" src={duck} />
      <Image className="absolute -bottom-2 -right-16" alt="gits" src={grandmother} />
      <Image className="absolute top-[50%] -translate-y-[50%] right-10" alt="gits" src={dog} />
      <Image className="absolute top-70 -rotate-25 -left-10" alt="gits" src={donkey} />
      <Image className="absolute w-[180px] h-auto top-0 right-0" alt="gits" src={pinyata} />
      <Image className="absolute w-[200px] -bottom-2 left-100" alt="gits" src={girl} />
      <Image className="absolute w-[200px] -bottom-10 left-50" alt="gits" src={rabbit} />
      <Image className="absolute w-[200px] top-30 right-0" alt="gits" src={plunger} />
      <Image className="absolute w-[200px] -bottom-4 left-150" alt="gits" src={danceBreakdance} />

    </div>
  );
}
