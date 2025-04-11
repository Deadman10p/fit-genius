
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColor = "gold" | "red" | "blue" | "green";

interface ColorThemeContextProps {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ColorThemeContext = createContext<ColorThemeContextProps | undefined>(undefined);

export const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const savedColor = localStorage.getItem("themeColor") as ThemeColor;
    return savedColor || "gold";
  });

  useEffect(() => {
    // Save color preference
    localStorage.setItem("themeColor", themeColor);
    
    // Update CSS variables based on the selected color
    const root = document.documentElement;
    
    // First remove all theme color classes
    root.classList.remove("theme-gold", "theme-red", "theme-blue", "theme-green");
    
    // Add the current theme color class
    root.classList.add(`theme-${themeColor}`);
  }, [themeColor]);

  return (
    <ColorThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};
