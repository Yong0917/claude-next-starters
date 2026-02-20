# Code Reviewer Agent Memory

## 프로젝트 핵심 구조 사항

- **실제 app 경로**: `src/app/` (CLAUDE.md에는 `app/`이라 나와있으나 실제로는 `src/app/`)
- **루트 레벨**: `components/`, `hooks/`, `lib/`, `types/`는 루트에 위치 (src/ 밖)
- **경로 별칭**: `@/*` -> `./`(루트) 이므로 `@/components`, `@/lib`, `@/hooks`, `@/types` 모두 정상
- **실제 Next.js 버전**: `16.1.6` (package.json 기준, CLAUDE.md에는 15라 표기됨)
- **React 버전**: `19.2.3`

## 발견된 반복 패턴 및 이슈

### 구조 불일치
- CLAUDE.md의 프로젝트 구조 설명이 실제와 불일치: `src/` 미사용이라 했으나 `src/app/` 사용 중
- `components.json`의 `tailwind.css` 경로가 `"app/globals.css"`로 잘못 설정됨 (실제: `src/app/globals.css`)
  - 이로 인해 `npx shadcn@latest add` 명령 실행 시 CSS 파일 경로 오류 가능

### 임포트 일관성
- `docs/page.tsx`, `examples/page.tsx`에서 barrel 파일(`@/components/common`) 대신 직접 경로(`@/components/common/page-header`) 사용
- layout 컴포넌트는 barrel을 통해 임포트하는 패턴과 혼용됨

### NavItem 타입 미활용
- `NavItem` 타입에 `disabled`, `external`, `icon` 속성이 정의되어 있으나 `Header`, `MobileNav`에서 전혀 처리하지 않음

### 커스텀 훅 개선 사항
- `useLocalStorage`의 `removeValue`가 `initialValue`를 의존성 배열에 포함 -> 객체 타입 전달 시 매 렌더마다 새 함수 생성 (무한루프는 없으나 최적화 필요)
- `useMediaQuery`: SSR 초기값 `false` 사용 -> 첫 렌더 후 실제값으로 변경되며 레이아웃 플리커 가능

### 접근성
- `Header`의 GitHub SVG: `aria-label`과 `<span className="sr-only">` 중복 (부모 `<Link>`에서 aria 처리)

### 개발 환경
- `package.json`의 `dev` 스크립트에 `--turbopack` 플래그 없음 (CLAUDE.md에서는 Turbopack 사용이라 표기)
- `next.config.ts`의 `turbopackUseSystemTlsCerts` experimental 옵션 사용 중

### 메타데이터
- `docs/page.tsx`, `examples/page.tsx`에 페이지별 `metadata` export 없음
- 환경변수 `NEXT_PUBLIC_APP_NAME`이 `.env.example`에 있으나 실제 코드에서 미사용

## 프로젝트 컨벤션 (확인됨)
- Server Component가 기본, Client Component는 `'use client'` 명시
- 컴포넌트 주석은 한국어 JSDoc 스타일
- 상수는 `lib/constants.ts`에서 관리
- barrel 파일(`index.ts`)로 re-export (layout/, common/, hooks/ 모두 적용)
- shadcn/ui 컴포넌트는 `components/ui/`에 직접 복사하여 수정 가능
