import { IconKey, Icons } from "@/assets/svg";
import Image, { ImageProps } from "next/image";

interface IconProps extends Omit<ImageProps, "src"> {
  icon: IconKey;
  alt: string;
}

export const Icon = ({ icon, alt = "", ...props }: IconProps) => {
  return <Image {...props} alt={alt} src={Icons[icon]} />;
};
