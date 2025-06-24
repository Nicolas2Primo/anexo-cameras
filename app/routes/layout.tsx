import { Outlet } from "react-router";
import Navbar from "~/components/navbar/Navbar";

export default function PageLayout() {
  return (
    // Este container ajuda a posicionar a navbar em relação à página toda
    <div className="relative w-screen h-screen flex items-center justify-center">
      {/* O Outlet renderizará o conteúdo da rota filha (ex: CameraPage) */}
      <Outlet />

      {/* A Navbar estática, sempre visível, na parte de baixo */}
      <Navbar variant="static" />
    </div>
  );
}
