// Notion-inspired design system
// Spacing scale (4px base unit)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '64px',
} as const

// Border radius
export const radius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
} as const

// Typography
export const typography = {
  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '15px',
    lg: '16px',
    xl: '18px',
    '2xl': '24px',
    '3xl': '36px',
    '4xl': '48px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const
