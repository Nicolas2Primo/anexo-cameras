import { useState, useRef, useEffect } from "react";
import Navbar from "~/components/navbar/Navbar";

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Esta é a função que lida com a lógica de tempo
    const setupTimeUpdateListener = () => {
      console.log(
        "Setup: Configurando o listener de 'timeupdate'. Duração:",
        videoElement.duration
      );

      const handleTimeUpdate = () => {
        const duration = videoElement.duration;
        const currentTime = videoElement.currentTime;

        if (isNaN(duration)) return; // Guarda contra durações inválidas

        const showNavTime = duration - 2.5;

        if (currentTime >= showNavTime) {
          console.log("CONDIÇÃO ATINGIDA! Mostrando a Navbar.");
          setIsNavVisible(true);
          // Limpa o próprio listener para não continuar rodando
          videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };

      videoElement.addEventListener("timeupdate", handleTimeUpdate);

      // Retorna a função de limpeza para o timeupdate
      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    };

    // --- A CORREÇÃO ESTÁ AQUI ---
    // Verificamos o `readyState` do vídeo. Se for > 0, os metadados já carregaram.
    // readyState 0: HAVE_NOTHING
    // readyState 1: HAVE_METADATA
    // etc.
    if (videoElement.readyState > 0) {
      console.log(
        "VÍDEO JÁ CARREGADO (readyState > 0). Configurando o listener diretamente."
      );
      setupTimeUpdateListener();
    } else {
      // Se os metadados ainda não carregaram, esperamos pelo evento.
      console.log("VÍDEO AINDA NÃO CARREGADO. Esperando por 'loadedmetadata'.");
      videoElement.addEventListener("loadedmetadata", setupTimeUpdateListener);
    }

    // A função de limpeza do useEffect precisa remover o listener de 'loadedmetadata'
    return () => {
      videoElement.removeEventListener(
        "loadedmetadata",
        setupTimeUpdateListener
      );
    };
  }, []); // O array de dependências vazio está correto.

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <video
        ref={videoRef}
        className="w-full h-full object-cover absolute"
        src="/Vídeo_Pronto_NexusLab2.mp4"
        autoPlay
        muted
        playsInline
        onError={(e) => console.error("ERRO AO CARREGAR O VÍDEO!", e)}
      ></video>

      <Navbar variant="animated" isHomeAnimationVisible={isNavVisible} />
    </div>
  );
}
