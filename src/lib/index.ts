import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};
