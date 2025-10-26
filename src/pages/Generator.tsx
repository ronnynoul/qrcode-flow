import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { jsPDF } from "jspdf";
import { Download, Palette } from "lucide-react";
import "@fontsource/orbitron/700.css";

export default function Generator() {
  const [qrName, setQrName] = useState("");
  const [qrLink, setQrLink] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    if (!qrLink) {
      alert("Veuillez d’abord entrer un lien pour générer le QR code !");
      return;
    }

    const qrDiv = qrRef.current;
    if (!qrDiv) return;

    const svgElement = qrDiv.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(image, 0, 0);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgSize = 200;
      const x = (pageWidth - imgSize) / 2;
      const y = (pageHeight - imgSize) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgSize, imgSize);

      // Signature centrée en bas du PDF
      pdf.setFontSize(10);
      pdf.text("© Ronny Harrys Noula", pageWidth / 2, pageHeight - 20, {
        align: "center",
      });

      pdf.save(`${qrName || "QR_Code"}.pdf`);
      URL.revokeObjectURL(url);
    };
    image.src = url;
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center bg-fixed px-4 py-12"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/blue-background-with-glowing-shapes-vector-file_783553-363.jpg')",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Laissez la magie opérer
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl">
        {/* Formulaire */}
        <div className="flex flex-col gap-5 w-full md:w-1/2 backdrop-blur-2xl bg-white/10 border border-white/20 p-6 md:p-8 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          <label className="font-semibold text-white">Nom du QR Code :</label>
          <input
            type="text"
            value={qrName}
            onChange={(e) => setQrName(e.target.value)}
            placeholder="Ex: Mon QR Code"
            className="border-0 rounded-lg px-3 py-2 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <label className="font-semibold text-white">Lien :</label>
          <input
            type="text"
            value={qrLink}
            onChange={(e) => setQrLink(e.target.value)}
            placeholder="https://exemple.com"
            className="border-0 rounded-lg px-3 py-2 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Sélecteur de couleur */}
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-2 text-white">
              <Palette size={20} />
              <span>Couleur du QR</span>
            </div>
            <input
              type="color"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:scale-110 transition-transform"
            />
          </div>

          <button
            onClick={handleExportPDF}
            className="mt-4 flex items-center justify-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-full text-lg md:text-xl shadow-lg hover:scale-105 transition-transform"
          >
            <Download size={22} />
            Exporter en PDF
          </button>
        </div>

        {/* Aperçu du QR Code */}
        <div
          className="flex flex-col items-center justify-center w-full md:w-1/2 bg-white/90 p-6 rounded-2xl shadow-2xl"
          ref={qrRef}
        >
          {qrLink ? (
            <QRCode value={qrLink} fgColor={qrColor} size={200} />
          ) : (
            <p className="text-gray-400 text-center">
              Votre QR code apparaîtra ici
            </p>
          )}

          {/* Signature visible sous le QR */}
          <div className="mt-4 text-gray-600/70 text-sm italic text-center">
            Scannez votre Qrcode avant l'export
          </div>
        </div>
      </div>
    </div>
  );
}
