import {
  Copyright,
  Description,
  Final,
  GuideRun,
  Header,
  ProgramList,
  Together,
} from "./mobile";

export const MobileLanding = () => {
  return (
    <div className="w-full max-w-[720px] mx-auto h-[300vh]">
      <Header />
      <Description />
      <ProgramList />
      <Together />
      <GuideRun />
      <Final />
      <Copyright />
    </div>
  );
};
