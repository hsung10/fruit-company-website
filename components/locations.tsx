"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// 카카오 지도 타입 정의
declare global {
  interface Window {
    kakao: any
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

// 카카오 지도 컴포넌트
function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) return

      try {
        // 지도 중심점 (서울 - 강남구)
        const center = new window.kakao.maps.LatLng(37.5665, 126.9780)
        
        // 지도 옵션
        const options = {
          center: center,
          level: 8 // 지도 확대 레벨
        }

        // 지도 생성
        const map = new window.kakao.maps.Map(mapRef.current, options)

        // 매장 위치에 마커 추가
        locations.forEach((location) => {
          const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lng)
          
          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            title: location.name
          })

          // 마커를 지도에 표시
          marker.setMap(map)

          // 인포윈도우 생성
          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `
              <div style="padding: 15px; min-width: 250px; font-family: 'Malgun Gothic', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: #f97316; font-size: 16px; font-weight: bold;">${location.name}</h3>
                <p style="margin: 5px 0; font-size: 14px; color: #666; line-height: 1.4;">📍 ${location.address}</p>
                <p style="margin: 5px 0; font-size: 14px; color: #666; line-height: 1.4;">📞 ${location.phone}</p>
                <p style="margin: 5px 0; font-size: 14px; color: #666; line-height: 1.4;">🕒 ${location.hours}</p>
              </div>
            `,
            removable: true
          })

          // 마커 클릭 시 인포윈도우 표시
          window.kakao.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker)
          })
        })

        setIsLoading(false)
      } catch (error) {
        console.error('카카오 지도 초기화 오류:', error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    const loadKakaoMaps = () => {
      console.log('🗺️ 카카오맵 로딩 시작...')
      console.log('📍 현재 도메인:', window.location.hostname)
      console.log('🔑 API 키 확인:', 'cc70aa4e6c4416c91a18643e3e1593f6')
      console.log('🌐 window.kakao 존재:', !!window.kakao)
      console.log('🗺️ window.kakao.maps 존재:', !!(window.kakao && window.kakao.maps))
      
      if (window.kakao && window.kakao.maps) {
        console.log('✅ 카카오맵 API 발견, 지도 초기화 중...')
        try {
          // kakao.maps.load()를 사용하여 지도 API를 완전히 로드
          window.kakao.maps.load(() => {
            console.log('🎉 카카오맵 API 로드 완료, 지도 생성 중...')
            initializeMap()
          })
        } catch (error) {
          console.error('❌ kakao.maps.load() 실행 중 오류:', error)
          setHasError(true)
          setIsLoading(false)
        }
      } else {
        console.log('⏳ 카카오맵 API 대기 중...')
        // 카카오 API가 아직 로드되지 않은 경우 대기
        let attempts = 0
        const maxAttempts = 100 // 10초 대기 (100ms * 100)
        
        const checkKakao = setInterval(() => {
          attempts++
          console.log(`🔄 카카오맵 API 확인 중... (${attempts}/${maxAttempts})`)
          
          if (window.kakao && window.kakao.maps) {
            console.log('✅ 카카오맵 API 발견!')
            clearInterval(checkKakao)
            try {
              window.kakao.maps.load(() => {
                console.log('🎉 카카오맵 API 로드 완료, 지도 생성 중...')
                initializeMap()
              })
            } catch (error) {
              console.error('❌ kakao.maps.load() 실행 중 오류:', error)
              setHasError(true)
              setIsLoading(false)
            }
          } else if (attempts >= maxAttempts) {
            clearInterval(checkKakao)
            console.error('❌ 카카오 지도 API 로딩 타임아웃')
            console.error('🔍 가능한 원인:')
            console.error('   1. API 키가 올바르지 않음')
            console.error('   2. 도메인이 카카오 개발자 콘솔에 등록되지 않음')
            console.error('   3. 네트워크 연결 문제')
            console.error('   4. 스크립트 로딩 실패')
            console.error('📋 현재 설정:')
            console.error('   - 도메인:', window.location.hostname)
            console.error('   - API 키: cc70aa4e6c4416c91a18643e3e1593f6')
            console.error('   - 스크립트 URL: https://dapi.kakao.com/v2/maps/sdk.js')
            setHasError(true)
            setIsLoading(false)
          }
        }, 100)
      }
    }

    // 컴포넌트 마운트 후 지도 로드 시작
    loadKakaoMaps()
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
              카카오 지도가 제대로 로드되지 않았습니다. 자바스크립트 콘솔에서 자세한 기술 정보를 확인하세요.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            <p>카카오 지도 API 키 설정을 확인해주세요.</p>
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

// 대체 지도 컴포넌트 (API 로딩 실패 시)
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
          <p>카카오 지도 API 로딩에 문제가 발생했습니다.</p>
          <p>네트워크 연결을 확인해주세요.</p>
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
            <KakaoMap />
          </div>
        </div>
      </div>
    </section>
  )
}