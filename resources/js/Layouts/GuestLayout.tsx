import { BackgroundBlur } from "@/components/background-blur";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <ThemeProvider>
            <div className="h-screen flex items-center justify-center bg-background sm:py-8 w-screen relative">
                <BackgroundBlur />
                <div className="w-full h-full z-50">{children}</div>
            </div>
            <Toaster />
        </ThemeProvider>
    );
}
