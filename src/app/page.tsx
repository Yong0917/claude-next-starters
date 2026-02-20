import Link from 'next/link'
import { FileText, Download, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// 서비스 주요 기능 소개
const features = [
  {
    icon: FileText,
    title: '견적서 웹 열람',
    description: '노션에 입력한 견적서 데이터를 깔끔한 웹 페이지로 확인할 수 있습니다.',
  },
  {
    icon: Download,
    title: 'PDF 다운로드',
    description: '견적서를 PDF 파일로 저장하여 보관하거나 전달할 수 있습니다.',
  },
  {
    icon: List,
    title: '견적서 목록 관리',
    description: '발행된 견적서 목록을 한눈에 확인하고 공유 URL을 관리합니다.',
  },
] as const

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          노션 견적서 웹뷰어
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground mb-10">
          노션에 입력한 견적서 데이터를 고객이 웹 브라우저에서 확인하고
          <br className="hidden sm:block" />
          PDF로 저장할 수 있는 서비스입니다.
        </p>
        <Button size="lg" asChild>
          <Link href="/quotes">견적서 목록 보기</Link>
        </Button>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title}>
                  <CardHeader>
                    <Icon className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
