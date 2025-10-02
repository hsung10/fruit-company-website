import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "김민지",
    role: "주부",
    content: "항상 신선한 과일을 받아볼 수 있어서 너무 만족스러워요. 특히 사과와 배가 정말 맛있습니다!",
    rating: 5,
  },
  {
    name: "이준호",
    role: "직장인",
    content: "온라인 주문이 편리하고 배송도 빨라서 자주 이용하고 있습니다. 품질도 매장과 똑같아요.",
    rating: 5,
  },
  {
    name: "박서연",
    role: "요식업 운영",
    content: "매장에서 대량 구매하는데 항상 신선하고 품질이 좋아서 단골이 되었습니다. 추천합니다!",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">고객 후기</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            프레시마켓을 이용하신 고객님들의 생생한 후기를 확인해보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed text-pretty">"{testimonial.content}"</p>
                <div className="pt-4 border-t">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
