import type { ComponentType, ReactNode } from 'react'

// ─── 네비게이션 타입 ──────────────────────────────────────────────────
export interface NavItem {
  title: string
  href: string
  description?: string
  disabled?: boolean
  external?: boolean
  icon?: ComponentType<{ className?: string }>
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

// ─── 사이트 설정 타입 ─────────────────────────────────────────────────
export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage?: string
  links: {
    github?: string
    twitter?: string
    docs?: string
  }
}

// ─── 공통 컴포넌트 Props 타입 ─────────────────────────────────────────
export interface WithClassName {
  className?: string
}

export interface WithChildren {
  children: ReactNode
}

// ─── API 응답 공통 타입 ───────────────────────────────────────────────
export type ApiResponse<T> =
  | { data: T; success: true }
  | { error: string; success: false }

// ─── 테마 타입 ────────────────────────────────────────────────────────
export type Theme = 'light' | 'dark' | 'system'
