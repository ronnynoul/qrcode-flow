import { useNavigate } from "react-router-dom";
import "@fontsource/orbitron/700.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white px-4 py-12"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/fotos-premium/inteligencia-artificial-microchip-que-impulsa-mentes-ciberneticas_950053-13925.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 md:gap-10 max-w-4xl">
        {/* Titre */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 font-orbitron drop-shadow-lg">
          Qrcode Flow
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg lg:text-2xl mb-6 sm:mb-8 max-w-xl drop-shadow-md px-2 sm:px-0">
          Créez vos QR codes personnalisés en quelques secondes et exportez-les facilement.
        </p>

        {/* Bouton */}
        <button
          onClick={() => navigate("/generator")}
          className="bg-white text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl shadow-lg hover:scale-105 transition-transform w-full sm:w-auto"
        >
          Commencer
        </button>
      </div>
    </div>
  );
}
