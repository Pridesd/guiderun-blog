import { Header } from "@/components/shared"
import { Category, CategoryFilters, HeroSection } from "./list"

interface BlogListLayoutProps {
  currentCategory?: Category
}

export const BlogListLayout = ({ currentCategory }: BlogListLayoutProps) => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[75rem] px-[1.5rem] pb-[3rem]">
        <HeroSection />
        <CategoryFilters currentCategory={currentCategory} />
      </main>
    </>
  )
}
