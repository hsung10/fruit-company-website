import { Facebook, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-2xl">🍎</span>
              </div>
              <span className="text-xl font-bold">프레시마켓</span>
            </div>
            <p className="text-sm text-background/80 leading-relaxed">신선한 과일로 건강한 삶을 만들어갑니다.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">회사정보</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  회사소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  채용정보
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  제휴문의
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  이용약관
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">고객센터</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  공지사항
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  1:1 문의
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  배송조회
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">고객센터</h3>
            <div className="space-y-2 text-sm text-background/80">
              <p className="text-2xl font-bold text-background">1588-1234</p>
              <p>평일 09:00 - 18:00</p>
              <p>주말 및 공휴일 휴무</p>
              <div className="flex gap-4 pt-4">
                <a href="#" className="hover:text-background transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-background transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-background transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
          <p>© 2025 프레시마켓. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
