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
    <div className="mx-auto w-full max-w-[720px]">
      <Header />
      <Description />
      <ProgramList />
      <Together />
      <GuideRun />
      <Final />
      <Copyright />
    </div>
  )
}
