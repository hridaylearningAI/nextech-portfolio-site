import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, with later Tailwind utilities winning over earlier ones.
 * This is the standard shadcn/ui helper; vendored components import it from
 * `@/lib/utils`, so the path matters as much as the behaviour.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
