"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    name: "프리미엄 사과",
    price: "15,900원",
    unit: "2kg",
    image: "/fresh-red-apples.png",
    badge: "인기",
  },
  {
    name: "달콤한 딸기",
    price: "12,900원",
    unit: "500g",
    image: "/fresh-strawberries.png",
    badge: "신상품",
  },
  {
    name: "제주 감귤",
    price: "18,900원",
    unit: "3kg",
    image: "/fresh-tangerines.jpg",
    badge: "베스트",
  },
  {
    name: "수입 포도",
    price: "24,900원",
    unit: "1kg",
    image: "/fresh-purple-grapes.jpg",
    badge: null,
  },
  {
    name: "국산 배",
    price: "22,900원",
    unit: "3kg",
    image: "/fresh-korean-pears.jpg",
    badge: "추천",
  },
  {
    name: "바나나",
    price: "8,900원",
    unit: "1kg",
    image: "/fresh-bananas.jpg",
    badge: null,
  },
]

export function Products() {
  const handleAddToCart = (productName: string) => {
    alert(`${productName}을(를) 장바구니에 담았습니다!`)
  }

  const handleViewAllProducts = () => {
    alert("전체 상품 페이지로 이동합니다. (실제 구현에서는 상품 목록 페이지로 이동)")
  }

  return (
    <section id="products" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">인기 상품</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            고객들이 가장 많이 찾는 신선한 과일을 만나보세요.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <CardContent className="pt-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAddToCart(product.name)}>장바구니 담기</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" onClick={handleViewAllProducts}>
            전체 상품 보기
          </Button>
        </div>
      </div>
    </section>
  )
}
