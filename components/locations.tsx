"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// 구글 지도 타입 정의
declare global {
  interface Window {
    google: any
  }
}

const locations = [
  {
    name: "강남점",
    address: "서울특별시 강남구 테헤란로 123",
    phone: "02-1234-5678",
    hours: "09:00 - 21:00",
    lat: 37.5665,
    lng: 126.9780,
  },
  {
    name: "홍대점",
    address: "서울특별시 마포구 홍익로 456",
    phone: "02-2345-6789",
    hours: "09:00 - 21:00",
    lat: 37.5563,
    lng: 126.9226,
  },
  {
    name: "부산점",
    address: "부산광역시 해운대구 센텀로 789",
    phone: "051-3456-7890",
    hours: "09:00 - 21:00",
    lat: 35.1796,
    lng: 129.1756,
  },
]

// 구글 지도 컴포넌트
function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const loadGoogleMaps = () => {
      try {
        if (window.google && mapRef.current) {
          // 지도 중심점 (서울)
          const center = { lat: 37.5665, lng: 126.9780 }
          
          // 지도 초기화
          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 10,
            center: center,
            styles: [
              {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [{ weight: "2.00" }]
              },
              {
                featureType: "all",
                elementType: "geometry.stroke",
                stylers: [{ color: "#9c9c9c" }]
              },
              {
                featureType: "all",
                elementType: "labels.text",
                stylers: [{ visibility: "on" }]
              },
              {
                featureType: "landscape",
                elementType: "all",
                stylers: [{ color: "#f2f2f2" }]
              },
              {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "landscape.man_made",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "off" }]
              },
              {
                featureType: "road",
                elementType: "all",
                stylers: [{ saturation: -100 }, { lightness: 45 }]
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [{ color: "#eeeeee" }]
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7b7b7b" }]
              },
              {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{ visibility: "simplified" }]
              },
              {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }]
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: [{ color: "#46bcec" }, { visibility: "on" }]
              },
              {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#c8d7d4" }]
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#070707" }]
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }]
              }
            ]
          })

          // 매장 위치에 마커 추가
          locations.forEach((location) => {
            const marker = new window.google.maps.Marker({
              position: { lat: location.lat, lng: location.lng },
              map: map,
              title: location.name,
              icon: {
                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#f97316" stroke="#fff" stroke-width="2"/>
                    <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="bold">🍎</text>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(40, 40),
              }
            })

            // 정보창 생성
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 10px; max-width: 250px;">
                  <h3 style="margin: 0 0 8px 0; color: #f97316; font-size: 16px; font-weight: bold;">${location.name}</h3>
                  <p style="margin: 4px 0; font-size: 14px; color: #666;">📍 ${location.address}</p>
                  <p style="margin: 4px 0; font-size: 14px; color: #666;">📞 ${location.phone}</p>
                  <p style="margin: 4px 0; font-size: 14px; color: #666;">🕒 ${location.hours}</p>
                </div>
              `
            })

            // 마커 클릭 시 정보창 표시
            marker.addListener("click", () => {
              infoWindow.open(map, marker)
            })
          })

          setIsLoading(false)
        }
      } catch (error) {
        console.error('구글 지도 로딩 오류:', error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    const handleScriptError = () => {
      console.error('구글 지도 API 스크립트 로딩 실패')
      setHasError(true)
      setIsLoading(false)
    }

    // 구글 지도 API 로드
    if (!window.google) {
      // API 키가 없으면 대체 UI 표시
      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        console.warn('구글 지도 API 키가 설정되지 않았습니다.')
        setHasError(true)
        setIsLoading(false)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = loadGoogleMaps
      script.onerror = handleScriptError
      document.head.appendChild(script)
    } else {
      loadGoogleMaps()
    }
  }, [])

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">지도를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  // 에러가 발생했을 때
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center space-y-4 p-8">
          <div className="w-16 h-16 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">⚠️</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">죄송합니다. 문제가 발생했습니다.</h3>
            <p className="text-muted-foreground text-sm">
              Google 지도가 제대로 로드되지 않았습니다. 자바스크립트 콘솔에서 자세한 기술 정보를 확인하세요.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>API 키 설정이 필요할 수 있습니다.</p>
            <p>GOOGLE_MAPS_SETUP.md 파일을 참고해주세요.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  )
}

// 대체 지도 컴포넌트 (API 키가 없을 때)
function FallbackMap() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
      <div className="text-center space-y-4 p-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <MapPin className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">매장 위치 안내</h3>
          <p className="text-muted-foreground text-sm mb-4">
            아래 매장 정보를 참고하여 방문해주세요.
          </p>
        </div>
        <div className="grid gap-3 text-left max-w-md mx-auto">
          {locations.map((location, index) => (
            <div key={index} className="bg-background p-3 rounded-lg border">
              <h4 className="font-semibold text-primary mb-1">{location.name}</h4>
              <p className="text-sm text-muted-foreground">📍 {location.address}</p>
              <p className="text-sm text-muted-foreground">📞 {location.phone}</p>
              <p className="text-sm text-muted-foreground">🕒 {location.hours}</p>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          <p>구글 지도를 사용하려면 API 키 설정이 필요합니다.</p>
          <p>GOOGLE_MAPS_SETUP.md 파일을 참고해주세요.</p>
        </div>
      </div>
    </div>
  )
}

export function Locations() {
  return (
    <section id="locations" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">매장 안내</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            전국 주요 도시에서 프레시마켓을 만나보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {locations.map((location, index) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-2xl font-bold text-primary">{location.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{location.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">{location.hours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-[21/9]">
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <GoogleMap />
            ) : (
              <FallbackMap />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}