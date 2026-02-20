import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { MobileNav } from './mobile-nav'
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants'

/**
 * 사이트 헤더 컴포넌트 (Server Component)
 * sticky 포지션, backdrop-blur 효과 적용
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* 로고 */}
        <Link href="/" className="mr-6 flex items-center gap-2">
          <span className="font-bold text-sm">{SITE_CONFIG.name}</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* 우측: 테마 토글 + 모바일 메뉴 */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
