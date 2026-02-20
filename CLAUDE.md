# CLAUDE.md

**노션 견적서 웹뷰어** - 노션 데이터베이스의 견적서 데이터를 고객에게 웹으로 제공하고 PDF 다운로드를 지원하는 서비스

상세 프로젝트 요구사항은 @/docs/PRD.md 참조

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (Turbopack 사용)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

shadcn/ui 컴포넌트 추가:
```bash
npx shadcn@latest add <component-name>
```

## 프로젝트 구조

Next.js 15 App Router 기반 프로젝트다. `src/app/` 디렉토리가 라우트 루트다.

```
src/app/              # Next.js App Router 라우트
  layout.tsx          # 루트 레이아웃 (Header, Footer, Providers 포함)
  page.tsx            # 홈페이지 (서비스 소개)
  providers.tsx       # ThemeProvider + TooltipProvider 래퍼 (클라이언트)
  globals.css         # 전역 CSS (TailwindCSS v4, shadcn 테마 변수)
  quote/[slug]/       # 견적서 상세 페이지 (고객용 공개 URL)
  quotes/             # 견적서 목록 페이지 (작성자용 내부)
components/
  ui/                 # shadcn/ui 컴포넌트 (직접 수정 가능)
  layout/             # Header, Footer, MobileNav, ThemeToggle
  common/             # PageHeader, LoadingSpinner
hooks/                # useMediaQuery, useLocalStorage, useDebounce, useMounted
lib/
  utils.ts            # cn() 유틸리티 함수
  helpers.ts          # 문자열/날짜/숫자/URL/배열 유틸리티
  constants.ts        # SITE_CONFIG, NAV_ITEMS, 노션 관련 상수
  notion.ts           # 노션 API 클라이언트 및 데이터 조회 함수 (예정)
types/
  index.ts            # 공통 타입 + Quote, QuoteItem, SenderInfo 등 견적서 타입
docs/
  PRD.md              # 프로젝트 요구사항 문서
```

## 아키텍처 핵심 사항

**경로 별칭**: `@/*`는 프로젝트 루트(`./`)를 가리킨다. 예: `@/components/ui/button`

**TailwindCSS v4**: CSS-first 방식. `@theme inline { }` 블록에서 CSS 변수를 Tailwind 토큰으로 매핑한다. 설정 파일(`tailwind.config.js`)이 없고, `app/globals.css`가 유일한 테마 설정 파일이다.

**shadcn/ui 설정**: New York 스타일, Neutral 컬러, `components.json`에 정의됨. 컴포넌트는 `components/ui/`에 복사되므로 직접 수정 가능하다.

**다크모드**: `next-themes`의 `ThemeProvider`로 관리. `attribute="class"` 방식이며, `.dark` 클래스가 html 요소에 토글된다.

**Providers 구조**: `app/providers.tsx`는 Client Component. ThemeProvider와 TooltipProvider를 감싸며, `app/layout.tsx`에서 사용한다.

**네비게이션 수정**: `lib/constants.ts`의 `NAV_ITEMS` 배열을 수정하면 Header와 MobileNav에 자동 반영된다. 사이트 메타 정보는 `SITE_CONFIG`에서 관리한다.

## 환경 변수

`.env.example` 파일 참고. 필수 변수:
- `NOTION_API_KEY`: 노션 Integration API 키 (서버 전용)
- `NOTION_QUOTE_DB_ID`: 견적서 메인 DB ID (서버 전용)
- `NOTION_QUOTE_ITEM_DB_ID`: 견적 항목 DB ID (서버 전용)
- `NOTION_SENDER_DB_ID`: 발행자 정보 DB ID (서버 전용)
- `NEXT_PUBLIC_APP_URL`: 앱 기본 URL (기본값: `http://localhost:3000`)
- `QUOTES_ADMIN_PATH`: 견적서 목록 페이지 경로 (기본값: `quotes`)

노션 API 키는 서버 전용이므로 `NEXT_PUBLIC_` 접두사를 붙이지 않는다. 클라이언트에서 접근해야 하는 변수만 `NEXT_PUBLIC_` 접두사를 붙인다.
