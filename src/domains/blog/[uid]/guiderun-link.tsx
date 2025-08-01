import Link from "next/link"

export const GuiderunLink = () => {
  return (
    <section className="mx-auto flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-gray-100 py-10">
      <h2 className="font-bold text-gray-800">가이드런과 함께 뛰고 싶다면?</h2>
      <Link
        href="https://guiderun.org"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transform rounded-xl bg-white px-10 py-4 font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        GRP와 함께 훈련하기
      </Link>
    </section>
  )
}
