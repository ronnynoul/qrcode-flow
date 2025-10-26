import { useNavigate } from "react-router-dom";
import "@fontsource/orbitron/700.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white px-4"
      style={{
        backgroundImage: "url('https://img.freepik.com/fotos-premium/inteligencia-artificial-microchip-que-impulsa-mentes-ciberneticas_950053-13925.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 font-orbitron drop-shadow-lg">
          Qrcode Flow
        </h1>

        
        <p className="text-lg md:text-2xl mb-8 max-w-xl drop-shadow-md">
          Créez vos QR codes personnalisés en quelques secondes et exportez-les facilement.
        </p>

        
        <button
          onClick={() => navigate("/generator")}
          className="bg-white text-black font-bold px-8 py-4 rounded-full text-lg md:text-xl shadow-lg hover:scale-105 transition-transform"
        >
          Commencer
        </button>
      </div>
    </div>
  );
}
