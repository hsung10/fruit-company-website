import { Card, CardContent } from "@/components/ui/card"
import { Truck, Shield, Clock, Leaf } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "빠른 배송",
    description: "주문 후 24시간 내 신선한 상태로 배송해드립니다.",
  },
  {
    icon: Shield,
    title: "품질 보증",
    description: "엄격한 품질 검사를 통과한 최상급 과일만 판매합니다.",
  },
  {
    icon: Clock,
    title: "당일 수확",
    description: "매일 아침 수확한 과일을 당일 출하하여 신선도를 유지합니다.",
  },
  {
    icon: Leaf,
    title: "친환경 재배",
    description: "농약을 최소화한 친환경 농법으로 재배된 과일입니다.",
  },
]

export function Features() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">왜 프레시마켓을 선택해야 할까요?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            고객의 건강과 만족을 최우선으로 생각하는 프레시마켓의 약속입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
