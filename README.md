# 노션 견적서 웹뷰어

노션에 입력한 견적서 데이터를 고객이 웹 브라우저에서 확인하고 PDF로 저장할 수 있도록 하여, 별도 견적서 툴 없이 노션만으로 견적 업무를 처리하는 서비스입니다.

## 프로젝트 개요

**목적**: 노션 데이터베이스를 견적서 CMS로 활용, 고객에게 공유 URL로 견적서 전달 및 PDF 다운로드 제공

**사용자**:
- 프리랜서/1인 사업자 (견적서 작성자)
- 고객/클라이언트 (견적서 수신자)

## 주요 페이지

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | 홈 | 서비스 소개 |
| `/quote/[slug]` | 견적서 상세 | 고객용 공개 URL, 견적 내용 확인 및 PDF 다운로드 |
| `/quotes` | 견적서 목록 | 작성자용 내부 관리 화면, 발행 현황 확인 |

## 핵심 기능

- **F001** 견적서 데이터 조회: 노션 API로 특정 견적서 데이터 불러오기
- **F002** 견적서 웹 렌더링: 항목, 수량, 단가, 세금, 총액 정형화 레이아웃 표시
- **F003** PDF 다운로드: 견적서 페이지를 PDF 파일로 변환하여 다운로드
- **F004** 견적서 유효성 처리: 존재하지 않거나 비공개 견적서 접근 시 오류 처리
- **F010** 견적서 목록 (내부용): 발행된 견적서 목록 확인 및 공유 URL 관리

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript 5.6+
- **Styling**: TailwindCSS v4 (CSS-first 방식)
- **UI Components**: shadcn/ui (New York 스타일, Neutral 컬러)
- **노션 연동**: @notionhq/client
- **데이터 검증**: Zod
- **PDF 생성**: html2canvas + jsPDF (예정)
- **배포**: Vercel

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 복사하여 `.env.local`을 생성하고 값을 입력합니다.

```bash
cp .env.example .env.local
```

필수 환경 변수:

```bash
NOTION_API_KEY=secret_xxxx               # 노션 Integration API 키
NOTION_QUOTE_DB_ID=xxxx                  # 견적서 메인 DB ID
NOTION_QUOTE_ITEM_DB_ID=xxxx            # 견적 항목 DB ID
NOTION_SENDER_DB_ID=xxxx               # 발행자 정보 DB ID
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. 노션 데이터베이스 설정

노션에서 아래 세 개의 데이터베이스를 생성하고 Integration을 연결합니다.

- **Quote** (견적서 메인 DB): slug, status, client_name, issue_date 등
- **QuoteItem** (견적 항목 DB): item_name, quantity, unit_price, quote(Relation)
- **SenderInfo** (발행자 정보 DB): company_name, business_number, bank_info 등

상세 스키마는 [PRD 문서](./docs/PRD.md)의 데이터 모델 섹션을 참고하세요.

### 4. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다.

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## 개발 상태

- [x] 기본 프로젝트 구조 설정
- [x] 사이트 메타 정보 및 네비게이션 설정
- [x] 노션 데이터 타입 정의
- [ ] 노션 API 연동 (`lib/notion.ts`)
- [ ] 견적서 상세 페이지 (`/quote/[slug]`)
- [ ] 견적서 목록 페이지 (`/quotes`)
- [ ] PDF 다운로드 기능
- [ ] 404/오류 페이지

## 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항 및 데이터 모델
- [개발 가이드](./CLAUDE.md) - 개발 규칙 및 아키텍처 안내
