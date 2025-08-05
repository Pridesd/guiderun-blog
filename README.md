# 가이드런 프로젝트 블로그

가이드런 프로젝트는 시각장애러너와 가이드러너가 함께 달리며, 건강과 성장을 추구하는 러닝 커뮤니티입니다. 이 블로그는 프로젝트의 소식, 훈련 프로그램, 서비스 안내, 커뮤니티 활동 등 다양한 이야기를 공유합니다.

## 주요 기능

- **블로그 게시글**: 훈련, 서비스 등 카테고리별로 게시글을 확인할 수 있습니다.
- **프로그램 안내**: 시즌별 훈련 프로그램 정보와 결과를 제공합니다.
- **가이드런 서비스 소개**: 프로젝트와 서비스, 크라우드펀딩 등 다양한 활동을 소개합니다.
- **접근성**: 반응형 UI와 시각장애인을 위한 접근성 고려.

## 시작하기

### 개발 환경

- Next.js 15
- TypeScript
- Prismic CMS
- TailwindCSS

### 설치 및 실행

```sh
npm install
npm run dev
```

로컬 개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 배포

```sh
npm run build
npm start
```

## 폴더 구조

- `/src/app` : 페이지 및 라우트
- `/src/domains` : 도메인별 UI 컴포넌트
- `/src/slices` : Prismic Slice 컴포넌트
- `/src/components/shared` : 공용 컴포넌트
- `/customtypes` : Prismic 타입 정의

## Prismic 연동

- Prismic에서 콘텐츠를 관리하며, Slice Machine으로 모델을 동기화합니다.
- 환경변수와 API 키 설정은 `.env` 파일을 참고하세요.

## 문의 및 참여

- [가이드런 공식 홈페이지](https://guiderun.org)
