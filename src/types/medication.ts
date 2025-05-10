
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: Schedule[];
  instructions?: string;
  color?: string;
  icon?: string;
  inventory: number;
  createDate: string;
  notes?: string;
}

export type Schedule = {
  time: string; // Format: "HH:MM"
  days: number[]; // 0-6, where 0 is Sunday
  active: boolean;
};

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MEDICATION_COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-med-blue-500",
  "bg-med-green-500",
];
