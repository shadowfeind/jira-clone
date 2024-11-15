import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInviteCode(length: number) {
  const characters =
    "ABXEFGHIJKLMNOPQRSTUVWXYZ12345679abcdefghijklmnopqrstuvwxyz";
  let result: string = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export function snakecaseToTitleCase(snakecase: string) {
  return snakecase
    .toLowerCase()
    .replace(/_/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
