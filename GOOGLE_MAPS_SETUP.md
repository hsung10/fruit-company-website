# 구글 지도 설정 가이드

## 1. 구글 지도 API 키 발급

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "라이브러리"로 이동
4. "Maps JavaScript API" 검색 후 활성화
5. "API 및 서비스" > "사용자 인증 정보"로 이동
6. "사용자 인증 정보 만들기" > "API 키" 선택
7. API 키 생성 후 복사

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

## 3. API 키 보안 설정

Google Cloud Console에서 API 키 보안 설정:

1. 생성한 API 키 클릭
2. "애플리케이션 제한사항"에서 "HTTP 리퍼러" 선택
3. 허용된 리퍼러에 다음 추가:
   - `localhost:3000/*` (개발용)
   - `your-domain.com/*` (프로덕션용)

## 4. API 제한 설정

"API 제한사항"에서 다음 API만 허용:
- Maps JavaScript API
- Places API (선택사항)

## 주의사항

- API 키는 절대 공개 저장소에 커밋하지 마세요
- `.env.local` 파일은 `.gitignore`에 포함되어 있습니다
- 프로덕션 환경에서는 도메인 제한을 반드시 설정하세요
