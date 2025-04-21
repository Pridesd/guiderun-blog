import {
  Copyright,
  Description,
  Final,
  GuideRun,
  Header,
  ProgramList,
  Together,
} from "./mobile"

export const MobileLanding = () => {
  return (
    <div className="mx-auto w-full">
      <Header />
      <Description />
      <ProgramList />
      <Together />
      <GuideRun />
      <Final />
      <Copyright />
      <span className="top-9 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-lg font-thin md:absolute md:block">
        (c)Guiderun Project All Right Reserved.
      </span>
    </div>
  )
}
