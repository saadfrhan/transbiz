import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGreeting() {
  const now = new Date();
  const currentHour = now.getHours();

  // Define the time ranges
  const morningStart = 6; // 6:00 AM (adjust this based on the actual sunrise time)
  const morningEnd = 12; // 12:00 PM (noon)
  const afternoonStart = 12; // 12:00 PM (noon)
  const afternoonEnd = 18; // 6:00 PM
  const nightStart = 18; // 6:00 PM
  const nightEnd = 24; // 12:00 AM (midnight)

  // Check the time of day and return the appropriate greeting
  if (currentHour >= morningStart && currentHour < morningEnd) {
    return "Good Morning,";
  } else if (currentHour >= afternoonStart && currentHour < afternoonEnd) {
    return "Good Afternoon,";
  } else if ((currentHour >= nightStart && currentHour < nightEnd) || currentHour < morningStart) {
    return "Hello,";
  } else {
    return "unknown";
  }
}