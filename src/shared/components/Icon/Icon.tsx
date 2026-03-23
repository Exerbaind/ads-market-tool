import { cn } from "@shared/lib";
import type { SVGProps } from "react";
import type { IconName } from "./icons";
import { icons } from "./icons";

export type { IconName } from "./icons";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  name: IconName;
  size?: string | number;
};

export const Icon = ({
  name,
  size = 20,
  className,
  style,
  ...rest
}: IconProps) => {
  const SvgIcon = icons[name];

  const computedStyle = {
    width: size,
    height: size,
    ...style,
  };

  return (
    <SvgIcon
      aria-hidden="true"
      className={cn("inline-block shrink-0 align-middle", className)}
      style={computedStyle}
      {...rest}
    />
  );
};
