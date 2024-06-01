import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const APP_THEME_KEY = "mini-chat-theme";

type DarkMode = "light" | "dark";

export const ThemeContext = createContext<{ theme: DarkMode; toggleTheme: () => void }>({
    theme: "light",
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<DarkMode>("light");

    const toggleTheme = () => {
        const newTheme: DarkMode = theme == "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem(APP_THEME_KEY, newTheme);
        addDarkClass(newTheme);
    };

    const addDarkClass = (mode: DarkMode) => {
        if (mode == "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    };

    useEffect(() => {
        const localTheme = localStorage.getItem(APP_THEME_KEY);
        if (localTheme) {
            const mode: DarkMode = localTheme == "dark" ? "dark" : "light";
            setTheme(mode);
            addDarkClass(mode);
        }
    }, []);

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
