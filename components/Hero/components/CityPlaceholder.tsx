import { ComponentPropsWithoutRef } from "react";

interface DefaultProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export const CityPlaceholder = (props: DefaultProps) => {
  const baseClass = "h-4 bg-muted animate-pulse w-full";
  return <div className={`${baseClass} ${props.className}`} />;
};
