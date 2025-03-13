import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Logo from "@/assets/head/logo.webp";
import OGImage from "@/assets/head/og-image.jpg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>가이드런 프로젝트</title>
      <meta
        name="description"
        content="시각장애러너와 가이드러너가 함께 만들어가는 가이드런 프로젝트입니다. 함께 달려요!"
      />
      <link rel="icon" href={Logo.src} />
      <link rel="apple-touch-icon" href={Logo.src} />
      <meta property="og:title" content="가이드런프로젝트" />
      <meta property="og:description" content="함께 달려요!" />
      <meta property="og:image" content={OGImage.src} />
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
