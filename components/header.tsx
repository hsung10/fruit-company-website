"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    phone: '',
    message: ''
  })

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 필수 필드 검증
    if (!formData.userId || !formData.email || !formData.phone || !formData.message) {
      alert("모든 필수 항목을 입력해주세요.")
      return
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("올바른 이메일 주소를 입력해주세요.")
      return
    }

    // 전화번호 형식 검증 (한국 형식)
    const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/
    if (!phoneRegex.test(formData.phone.replace(/-/g, ''))) {
      alert("올바른 전화번호를 입력해주세요. (예: 010-1234-5678)")
      return
    }

    // 문의내용 글자 수 검증 (50자 제한)
    if (formData.message.length > 50) {
      alert("문의내용은 50자 이내로 작성해주세요.")
      return
    }

    // 폼 제출 성공
    alert("문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.")
    setIsContactModalOpen(false)
    setFormData({ userId: '', email: '', phone: '', message: '' })
  }

  const handleInputChange = (field: string, value: string) => {
    // 문의내용의 경우 50자 제한
    if (field === 'message' && value.length > 50) {
      alert("문의내용은 50자 이내로 작성해주세요.")
      return
    }
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // 부드러운 스크롤 함수
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      
      const startPosition = window.pageYOffset
      const distance = elementPosition - startPosition
      const duration = 800
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

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* 스크롤 진행도 바 */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-2xl">🍎</span>
            </div>
            <span className="text-xl font-bold text-primary">프레시마켓</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => smoothScrollTo('about')} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              회사소개
            </button>
            <button 
              onClick={() => smoothScrollTo('products')} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              상품안내
            </button>
            <button 
              onClick={() => smoothScrollTo('locations')} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              매장찾기
            </button>
            <button 
              onClick={() => smoothScrollTo('contact')} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              고객센터
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleOnlineShopping}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              온라인 쇼핑
            </Button>
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">문의하기</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>문의하기</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userId">아이디 *</Label>
                    <Input
                      id="userId"
                      type="text"
                      placeholder="아이디를 입력하세요"
                      value={formData.userId}
                      onChange={(e) => handleInputChange('userId', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일 주소 *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="message">문의내용 *</Label>
                      <span className={`text-sm ${formData.message.length > 50 ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {formData.message.length}/50
                      </span>
                    </div>
                    <Textarea
                      id="message"
                      placeholder="문의하실 내용을 자세히 입력해주세요 (50자 이내)"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsContactModalOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit">문의하기</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <button 
              onClick={() => {
                smoothScrollTo('about')
                setIsMenuOpen(false)
              }} 
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              회사소개
            </button>
            <button 
              onClick={() => {
                smoothScrollTo('products')
                setIsMenuOpen(false)
              }} 
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              상품안내
            </button>
            <button 
              onClick={() => {
                smoothScrollTo('locations')
                setIsMenuOpen(false)
              }} 
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              매장찾기
            </button>
            <button 
              onClick={() => {
                smoothScrollTo('contact')
                setIsMenuOpen(false)
              }} 
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              고객센터
            </button>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleOnlineShopping}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                온라인 쇼핑
              </Button>
              <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full">
                    문의하기
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>문의하기</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-userId">아이디 *</Label>
                      <Input
                        id="mobile-userId"
                        type="text"
                        placeholder="아이디를 입력하세요"
                        value={formData.userId}
                        onChange={(e) => handleInputChange('userId', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile-email">이메일 주소 *</Label>
                      <Input
                        id="mobile-email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile-phone">연락처 *</Label>
                      <Input
                        id="mobile-phone"
                        type="tel"
                        placeholder="010-1234-5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="mobile-message">문의내용 *</Label>
                        <span className={`text-sm ${formData.message.length > 50 ? 'text-red-500' : 'text-muted-foreground'}`}>
                          {formData.message.length}/50
                        </span>
                      </div>
                      <Textarea
                        id="mobile-message"
                        placeholder="문의하실 내용을 자세히 입력해주세요 (50자 이내)"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={4}
                        maxLength={50}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsContactModalOpen(false)}>
                        취소
                      </Button>
                      <Button type="submit">문의하기</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
