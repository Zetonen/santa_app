import Image from "next/image";
import olegImage from "./Oleg.jpg";

export default function AboutPage() {
  console.log(olegImage);

  return (
    <div>
      <p>About Oleg</p>
      <Image src={olegImage} alt="Oleg" width={500} height={500} />
    </div>
  );
}
