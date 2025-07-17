export const colors = {
  primary: '#B892D5',
  secondary: '#9C989F',
  accent: '#E29AEE',
  neutral: '#FFFFFF',
  textBase: '#1E1E1E'
} as const

export type ColorKey = keyof typeof colors
