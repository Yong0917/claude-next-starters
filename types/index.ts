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

// ─── 견적서 관련 타입 ─────────────────────────────────────────────────

/** 견적서 상태 */
export type QuoteStatus = '초안' | '발행' | '만료'

/**
 * 발행자(작성자) 정보
 * 노션 SenderInfo 데이터베이스 레코드에 대응
 */
export interface SenderInfo {
  /** 발행자 회사명 또는 이름 */
  company_name: string
  /** 사업자 등록번호 */
  business_number?: string
  /** 발행자 주소 */
  address?: string
  /** 연락처 */
  phone?: string
  /** 이메일 */
  email?: string
  /** 계좌 정보 (입금 안내용) */
  bank_info?: string
}

/**
 * 견적 항목 (행)
 * 노션 QuoteItem 데이터베이스 레코드에 대응
 */
export interface QuoteItem {
  /** 노션 페이지 ID */
  id: string
  /** 항목명 (작업/제품명) */
  item_name: string
  /** 수량 */
  quantity: number
  /** 단가 */
  unit_price: number
  /** 소계 (수량 x 단가) */
  subtotal: number
  /** 항목 설명 (선택) */
  description?: string
  /** 항목 표시 순서 */
  sort_order?: number
}

/**
 * 견적서 메인 데이터
 * 노션 Quote 데이터베이스 레코드에 대응
 */
export interface Quote {
  /** 노션 페이지 ID */
  id: string
  /** 견적서 제목 */
  title: string
  /** 공개 URL용 고유 식별자 */
  slug: string
  /** 견적서 상태 */
  status: QuoteStatus
  /** 고객(수신자) 이름 또는 회사명 */
  client_name: string
  /** 고객 이메일 */
  client_email?: string
  /** 고객 주소 */
  client_address?: string
  /** 발행일 (ISO 8601) */
  issue_date: string
  /** 견적 유효기간 (ISO 8601) */
  due_date?: string
  /** 세율 (0.1 = 10%) */
  tax_rate: number
  /** 특이사항/비고 */
  notes?: string
  /** 공개 여부 */
  is_public: boolean
  /** 견적 항목 목록 */
  items: QuoteItem[]
  /** 발행자 정보 */
  sender?: SenderInfo
}

/**
 * 견적서 목록 항목 (목록 페이지에서 사용하는 요약 데이터)
 */
export interface QuoteSummary {
  /** 노션 페이지 ID */
  id: string
  /** 견적서 제목 */
  title: string
  /** 공개 URL용 고유 식별자 */
  slug: string
  /** 견적서 상태 */
  status: QuoteStatus
  /** 고객(수신자) 이름 또는 회사명 */
  client_name: string
  /** 발행일 (ISO 8601) */
  issue_date: string
  /** 견적 유효기간 (ISO 8601) */
  due_date?: string
  /** 공개 여부 */
  is_public: boolean
  /** 견적 항목 소계 합산 (세금 제외) */
  subtotal_amount: number
  /** 세율 (0.1 = 10%) */
  tax_rate: number
}

/**
 * 견적서 금액 계산 결과
 */
export interface QuoteAmounts {
  /** 항목 소계 합산 (세금 제외) */
  subtotal: number
  /** 세액 */
  tax_amount: number
  /** 총액 (소계 + 세액) */
  total: number
}
