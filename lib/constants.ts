import type { SiteConfig, NavItem } from '@/types'

// ─── 사이트 메타 정보 ─────────────────────────────────────────────────
export const SITE_CONFIG: SiteConfig = {
  name: 'Claude Next Starters',
  description: '빠르게 시작하는 Next.js 모던 웹 스타터킷',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  links: {
    github: 'https://github.com',
  },
}

// ─── 헤더 네비게이션 링크 ─────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { title: '홈', href: '/' },
  { title: '문서', href: '/docs' },
  { title: '예제', href: '/examples' },
]

// ─── 환경 변수 ────────────────────────────────────────────────────────
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
