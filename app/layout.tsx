import AuthGuard from "./components/AuthGuard";
import BackgroundMusic from "./components/BackgroundMusic";
import "./styles/globals.css";

export const metadata = {
  title: "Таємний Санта Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <BackgroundMusic src="/music/christmas_music.mp3" />
        <div className="min-h-screen overflow-hidden christmas-theme bg-christmas-pattern text-snow-white flex flex-col items-center justify-center relative">
          <main className="z-10 w-full flex items-center justify-center flex-grow">
            <AuthGuard>{children}</AuthGuard>
          </main>

          <div className="garland top-[0px] skew-y-2 garland-top"></div>
          <div className="garland bottom-[0px] -skew-y-2 garland-bottom"></div>
        </div>
      </body>
    </html>
  );
}
