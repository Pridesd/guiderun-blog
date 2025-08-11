declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
  }
}

// 이 파일이 모듈(module)임을 나타내기 위해 export {} 를 추가합니다.
// 전역 스코프를 오염시키지 않기 위함입니다.
export {}
