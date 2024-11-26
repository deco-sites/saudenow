import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  /**
   * @default 250
   */
  width?: number;
  /**
   * @default 92
   */
  height?: number;
}

/**
 * @titleBy text
 */
export interface ButtonProps {
  text?: string;
  href?: string;
  target?: "_blank" | "_self";
}

export interface Props {
  logo: Logo;
  buttons?: ButtonProps[];
}

export default function HeaderExperience(
  { logo, buttons = [] }: Props,
) {
  const hasButtons = buttons && buttons.length > 0;

  return (
    <header class="h-24 lg:h-20 bg-black">
      <div
        class={`fixed z-50 w-full bg-black flex items-center px-6 lg:px-28 mx-auto ${
          hasButtons ? "justify-around" : "justify-center lg:justify-start"
        }`}
      >
        <div class="cursor-pointer">
          <a href="#">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 250}
              height={logo.height || 92}
            />
          </a>
        </div>

        {hasButtons && (
          <ul class="flex gap-6">
            {buttons.map(({ href, target, text }) => (
              <li class="cursor-pointer hover:underline">
                <a
                  class="bg-[#C45EFF] text-white py-2 px-3.5 rounded-full"
                  target={target}
                  href={href}
                >
                  {text || "03/12/2024 • 19H"}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
