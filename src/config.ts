export type ShadowSize = 'none' | 'small' | 'medium' | 'large'
export type Align = 'left' | 'center' | 'right'
export type GalleryAlign = 'left' | 'center' | 'right'
export type LayoutKind = 'layoutA' | 'layoutB'

export interface UIConfig {
  layout: LayoutKind
  typography: {
    fontFamily: 'Inter' | 'Roboto' | 'Poppins'
    fontSize: number // 10..60
    fontWeight: 400 | 500 | 600 | 700
  }
  button: {
    radius: number
    background: string
    color: string
    shadow: ShadowSize
    align: Align
  }
  gallery: {
    align: GalleryAlign
    gap: number
    imgRadius: number
  }
  layoutBox: {
    cardRadius: number
    containerPadding: number
    sectionBg: string
  }
  stroke: {
    color: string
    weight: number
  }
}

export const defaultA: UIConfig = {
  layout: 'layoutA',
  typography: { fontFamily: 'Inter', fontSize: 16, fontWeight: 600 },
  button: {
    radius: 10,
    background: '#111827',
    color: '#ffffff',
    shadow: 'medium',
    align: 'center'
  },
  gallery: { align: 'center', gap: 12, imgRadius: 12 },
  layoutBox: { cardRadius: 16, containerPadding: 24, sectionBg: '#f6f7fb' },
  stroke: { color: '#e5e7eb', weight: 1 }
}

export const defaultB: UIConfig = {
  layout: 'layoutB',
  typography: { fontFamily: 'Poppins', fontSize: 18, fontWeight: 600 },
  button: {
    radius: 14,
    background: '#2563eb',
    color: '#ffffff',
    shadow: 'large',
    align: 'left'
  },
  gallery: { align: 'left', gap: 10, imgRadius: 16 },
  layoutBox: { cardRadius: 20, containerPadding: 28, sectionBg: '#f2f6ff' },
  stroke: { color: '#d1d5db', weight: 1 }
}

export function shadowToCSS(s: ShadowSize): string {
  switch (s) {
    case 'small': return '0 2px 6px rgba(0,0,0,.12)'
    case 'medium': return '0 6px 14px rgba(0,0,0,.12)'
    case 'large': return '0 12px 24px rgba(0,0,0,.14)'
    default: return '0 0 0 rgba(0,0,0,0)'
  }
}

export function alignToCSS(a: Align): string {
  if (a === 'left') return 'flex-start'
  if (a === 'right') return 'flex-end'
  return 'center'
}

export function galleryAlignToCSS(a: GalleryAlign): string {
  if (a === 'left') return 'start'
  if (a === 'right') return 'end'
  return 'center'
}
