import Logo from "@/assets/head/logo.webp"
import Image from "next/image"

export const TeamProfile = () => {
  return (
    <div className="my-14 flex gap-3">
      <div className="overflow-hidden rounded-full border-[1px] border-gray-100">
        <Image src={Logo} alt="" width={52} height={52} />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold">가이드런 프로젝트</h2>
        <p>다같이 함께 달려요!</p>
      </div>
    </div>
  )
}
