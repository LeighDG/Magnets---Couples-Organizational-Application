import bgImage from "../assets/background-img.png";

export default function BackgroundLayout({
  children,
  overlay = "bg-black/20",
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlay}`} />

      {/* Page content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
