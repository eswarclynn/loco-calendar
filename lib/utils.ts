import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
export const toLocalISOString = (date: Date) =>
  new Date(date.getTime() - tzoffset).toISOString().slice(0, -1);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
