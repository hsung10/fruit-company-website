"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const handleOnlineShopping = () => {
    // 인기 상품 섹션으로 부드럽게 스크롤 이동
    const productsSection = document.getElementById('products')
    if (productsSection) {
      // 헤더 높이를 고려하여 약간 위쪽으로 스크롤
      const headerHeight = 80
      const elementPosition = productsSection.offsetTop - headerHeight
      
      // 더 부드러운 스크롤을 위한 커스텀 애니메이션
      const startPosition = window.pageYOffset
      const distance = elementPosition - startPosition
      const duration = 800 // 0.8초 동안 스크롤
      let startTime: number | null = null

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)
        
        window.scrollTo(0, startPosition + distance * ease)
        
        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }

  const handleFindStore = () => {
    // 매장 안내 섹션으로 부드럽게 스크롤 이동
    const locationsSection = document.getElementById('locations')
    if (locationsSection) {
      // 헤더 높이를 고려하여 약간 위쪽으로 스크롤
      const headerHeight = 80
      const elementPosition = locationsSection.offsetTop - headerHeight
      
      // 더 부드러운 스크롤을 위한 커스텀 애니메이션
      const startPosition = window.pageYOffset
      const distance = elementPosition - startPosition
      const duration = 800 // 0.8초 동안 스크롤
      let startTime: number | null = null

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)
        
        window.scrollTo(0, startPosition + distance * ease)
        
        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                신선함을 배달합니다
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              매일 아침 수확한
              <br />
              <span className="text-primary">신선한 과일</span>을
              <br />
              여러분께
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-xl">
              프레시마켓은 전국 농가와 직거래로 가장 신선한 과일을 합리적인 가격에 제공합니다. 온라인과 오프라인
              매장에서 만나보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" onClick={handleOnlineShopping}>
                온라인 쇼핑 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent" onClick={handleFindStore}>
                가까운 매장 찾기
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">전국 매장</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">50만+</div>
                <div className="text-sm text-muted-foreground">만족한 고객</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">24시간</div>
                <div className="text-sm text-muted-foreground">신선도 보장</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card shadow-2xl">
              <img src="/fresh-colorful-fruits-in-a-basket.jpg" alt="신선한 과일" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold">품질 보증</div>
                  <div className="text-sm text-muted-foreground">100% 환불 보장</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
