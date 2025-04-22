import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  webpack: (config) => {
    // 기존 URL 파일로더 규칙을 가져옵니다.
    const fileLoaderRule = config.module.rules.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rule: { test: { test: (arg0: string) => any } }) =>
        rule.test?.test?.(".svg")
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: /components/ },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /components/,
        use: ["@svgr/webpack"],
      }
    )

    // 수정된 설정을 리턴해야만 적용됩니다.
    return config
  },
}

export default nextConfig
