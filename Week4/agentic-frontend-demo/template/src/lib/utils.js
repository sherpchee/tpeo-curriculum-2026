import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes without conflicts.
 * Use for conditional styling in components.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
