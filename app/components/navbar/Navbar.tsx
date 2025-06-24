import { NavLink } from "react-router";
import clsx from "clsx";
import { useState, useEffect } from "react";

const baseNavLinks = ["Cameras", "Dashboard", "Settings"];

interface NavbarProps {
  variant: "animated" | "static";
  isHomeAnimationVisible?: boolean;
}

export default function Navbar({
  variant,
  isHomeAnimationVisible,
}: NavbarProps) {
  const [isStaticNavVisible, setIsStaticNavVisible] = useState(false);

  const isAnimatedVariant = variant === "animated";
  const linksToRender = isAnimatedVariant
    ? baseNavLinks
    : ["Home", ...baseNavLinks];

  useEffect(() => {
    if (!isAnimatedVariant) {
      const timer = setTimeout(() => {
        setIsStaticNavVisible(true);
      }, 100); // 100ms de delay

      return () => clearTimeout(timer); // Limpeza do timer
    }
  }, [isAnimatedVariant]); // O efeito depende da variante da navbar

  const getPathForLink = (link: string) => {
    if (link.toLowerCase() === "home") return "/";
    return `/${link.toLowerCase()}`;
  };

  // 4. Simplificar a lógica de visibilidade
  const shouldBeVisible = isAnimatedVariant
    ? isHomeAnimationVisible
    : isStaticNavVisible;

  const navClasses = clsx(
    "flex gap-8 px-6 py-3 backdrop-blur-xl bg-black/30 rounded-2xl z-50",
    "transition-all duration-700 ease-in-out", // Aplicar a transição em AMBAS as variantes
    {
      "absolute bottom-60": isAnimatedVariant, // Posição na Home
      "absolute bottom-16": !isAnimatedVariant, // Posição nas outras páginas
      "opacity-100 translate-y-0": shouldBeVisible, // Estado final visível
      "opacity-0 translate-y-8": !shouldBeVisible, // Estado inicial invisível
    }
  );

  return (
    <div className={navClasses}>
      {linksToRender.map((link) => (
        <NavLink
          key={link}
          to={getPathForLink(link)}
          end={link.toLowerCase() === "home"}
        >
          {({ isActive }) => (
            <button
              className={clsx(
                "px-4 py-2 text-lg font-light tracking-widest rounded-full cursor-pointer transition-all duration-300 ease-in-out",
                {
                  "bg-white/20 scale-110": isActive,
                  "hover:bg-white/10 hover:scale-110": !isActive,
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
