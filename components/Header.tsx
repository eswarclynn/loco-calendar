import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LogoDark from "./logo-dark.png";
import LogoLight from "./logo-light.png";

export function Header() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2 items-center">
        {theme === "light" ? (
          <Image
            src={LogoLight}
            alt="Loco Logo Light"
            height="30"
            className="inline"
          />
        ) : (
          <Image
            src={LogoDark}
            alt="Loco Logo"
            height="30"
            className="inline"
          />
        )}
        <span className="text-2xl font-bold">Calendar</span>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        title="Toggle Theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
}
