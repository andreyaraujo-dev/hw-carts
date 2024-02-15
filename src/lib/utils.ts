import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateToCalendarInput(date: string | Date): Date {
  const cutDate = new Date(date)
    .toLocaleDateString('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .replace(/\//g, '-')
    .split('-')
  return new Date(`${cutDate[2]}-${cutDate[0]}-${cutDate[1]}T00:00:00`)
}
