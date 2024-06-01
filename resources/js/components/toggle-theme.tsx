import { useTheme } from "@/providers/theme-provider";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export function ToggleTheme() {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button variant={"outline"} size={"icon"} onClick={toggleTheme}>
            {theme === "dark" && <SunIcon className="h-5 w-5" />}
            {theme === "light" && <MoonIcon className="h-5 w-5" />}
        </Button>
    );
}
