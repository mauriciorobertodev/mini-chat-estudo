import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getFakeAvatar(name: string) {
    return "https://i.pravatar.cc/80?u=" + name;
}
