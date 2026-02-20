import type { SiteConfig, NavItem } from '@/types'

// ─── 사이트 메타 정보 ─────────────────────────────────────────────────
export const SITE_CONFIG: SiteConfig = {
  name: '노션 견적서 웹뷰어',
  description: '노션에 입력한 견적서 데이터를 고객이 웹 브라우저에서 확인하고 PDF로 저장할 수 있는 서비스',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  links: {},
}

// ─── 헤더 네비게이션 링크 ─────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { title: '홈', href: '/' },
  { title: '견적서 목록', href: '/quotes' },
]

// ─── 환경 변수 ────────────────────────────────────────────────────────
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

// ─── 노션 관련 상수 ───────────────────────────────────────────────────

/** 견적서 공개 URL 경로 프리픽스 */
export const QUOTE_PATH_PREFIX = '/quote'

/** 견적서 목록 내부 경로 */
export const QUOTES_ADMIN_PATH = process.env.QUOTES_ADMIN_PATH ?? 'quotes'

/** 기본 세율 (10%) */
export const DEFAULT_TAX_RATE = 0.1

/** 견적서 상태 값 */
export const QUOTE_STATUS = {
  DRAFT: '초안',
  ISSUED: '발행',
  EXPIRED: '만료',
} as const

/** 노션 API 캐시 재검증 주기 (초 단위, 기본 1시간) */
export const NOTION_CACHE_REVALIDATE_SECONDS = 3600
