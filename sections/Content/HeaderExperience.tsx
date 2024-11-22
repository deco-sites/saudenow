import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface firstButtonProps {
  text?: string;
  href?: string;
  target?: "_blank" | "_self";
}

export interface secondButtonProps {
  text?: string;
  href?: string;
  target?: "_blank" | "_self";
}

export interface Props {
  logo: Logo;
  firstButton: firstButtonProps;
  secondButton: secondButtonProps;
}

export default function HeaderExperience({logo, firstButton, secondButton}:Props) {
  return (
    <section class="fixed z-50 w-full max-w-full max-h-[92px] bg-black flex items-center justify-around mb-10 mx-auto">
      <div class="cursor-pointer mr-52">
        <a href="#">
          <Image
            class=""
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 250}
            height={logo.height || 92}
          />
        </a>
      </div>
      <div class="ml-52">
        <ul class="flex gap-6">
          <li class="cursor-pointer hover:underline">
            <a class="bg-[#C45EFF] text-white py-2 px-3.5 rounded-full" target={firstButton.target} href={firstButton.href}>{firstButton.text || "03/12/2024 • 19H"}</a>
          </li>
          <li class="cursor-pointer hover:underline">
            <a class="bg-white text-black py-2 px-3.5 rounded-full" target={secondButton.target} href={secondButton.href}>{secondButton.text || "ONLINE E GRATUITO"}</a>
          </li>
        </ul>
      </div>
    </section>
  )
}