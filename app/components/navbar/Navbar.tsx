import { NavLink } from "react-router";
import clsx from "clsx";

const baseNavLinks = ["Cameras", "Dashboard", "Settings"];

// Definimos as propriedades que o nosso componente pode receber
interface NavbarProps {
  variant: "animated" | "static";
  // A visibilidade só é necessária para a variante animada
  isVisible?: boolean;
}

export default function Navbar({ variant, isVisible }: NavbarProps) {
  const isAnimated = variant === "animated";

  // A lista de links a ser renderizada muda com base na variante
  const linksToRender = isAnimated ? baseNavLinks : ["Home", ...baseNavLinks];

  // Função para obter o caminho correto para cada link
  const getPathForLink = (link: string) => {
    if (link.toLowerCase() === "home") {
      return "/";
    }
    return `/${link.toLowerCase()}`;
  };

  const navClasses = clsx(
    "flex gap-8 px-6 py-3 backdrop-blur-xl bg-black/30 rounded-2xl z-50", // Classes base
    {
      // Classes para a variante ANIMADA (Home)
      "absolute bottom-60 transition-all duration-700 ease-in-out": isAnimated,
      "opacity-100 translate-y-0": isAnimated && isVisible,
      "opacity-0 translate-y-8": isAnimated && !isVisible,
      // Classes para a variante ESTÁTICA (Outras páginas)
      "absolute bottom-10": !isAnimated,
    }
  );

  return (
    <div className={navClasses}>
      {linksToRender.map((link) => (
        <NavLink
          key={link}
          to={getPathForLink(link)}
          // Adiciona a propriedade `end` para o link da Home para garantir que ele só fique ativo na rota exata "/"
          end={link.toLowerCase() === "home"}
        >
          {({ isActive }) => (
            <button
              className={clsx(
                "px-4 py-2 text-lg font-light tracking-widest rounded-full cursor-pointer transition-all duration-300 ease-in-out",
                {
                  "bg-white/20 scale-110": isActive, // Estilo para o link ativo
                  "hover:bg-white/10 hover:scale-110": !isActive, // Estilo para links inativos
                }
              )}
            >
              {link}
            </button>
          )}
        </NavLink>
      ))}
    </div>
  );
}
