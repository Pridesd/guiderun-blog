import React, { PropsWithChildren } from "react";

export const StaggerAnimation = ({ children }: PropsWithChildren) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <div
          className="animate-stagger"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {child}
        </div>
      ))}
    </>
  );
};
