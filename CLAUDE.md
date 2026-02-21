# CLAUDE.md

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

Next.js 15 App Router 기반의 스타터킷이다. `app/` 디렉토리가 라우트 루트이며, `src/` 디렉토리는 사용하지 않는다.

```
app/                  # Next.js App Router 라우트
  layout.tsx          # 루트 레이아웃 (Header, Footer, Providers 포함)
  page.tsx            # 홈페이지
  providers.tsx       # ThemeProvider + TooltipProvider 래퍼 (클라이언트)
  globals.css         # 전역 CSS (TailwindCSS v4, shadcn 테마 변수)
components/
  ui/                 # shadcn/ui 컴포넌트 (직접 수정 가능)
  layout/             # Header, Footer, MobileNav, ThemeToggle
  common/             # PageHeader, LoadingSpinner
hooks/                # useMediaQuery, useLocalStorage, useDebounce, useMounted
lib/
  utils.ts            # cn() 유틸리티 함수
  helpers.ts          # 문자열/날짜/숫자/URL/배열 유틸리티
  constants.ts        # SITE_CONFIG, NAV_ITEMS, IS_PRODUCTION
types/
  index.ts            # NavItem, SiteConfig, ApiResponse, Theme 등 공통 타입
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
- `NEXT_PUBLIC_APP_URL`: 앱 기본 URL (기본값: `http://localhost:3000`)

클라이언트에서 접근해야 하는 변수만 `NEXT_PUBLIC_` 접두사를 붙인다.
