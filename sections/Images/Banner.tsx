import Button, {
  Props as ButtonProps,
} from "$store/components/ui/CustomizedButton.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface Logo {
  image: ImageWidget;
  alt?: string;
}

export interface BannerProps {
  /**
   * @format color
   * @default #fff
   */
  backgroundColor?: string;
  /**
   * @format color
   * @default #000
   */
  textColor?: string;
  alignment?: "center" | "start";
  /** @description desktop otimized image */
  desktop: {
    image: ImageWidget;
    width?: number;
    height?: number;
  };
  /** @description mobile otimized image */
  mobile: {
    image: ImageWidget;
    width?: number;
    height?: number;
  };
  alt: string;
  /** @description active this if the Banner is the largest content in the screen */
  lcp?: boolean;
  /**
   * @description Image's description
   */
  bgImageAlt: string;
  /** @description Image's link */
  link?: string;
  /**
   * @title do you want it to go to another page when you click the link?
   */
  targetBlankActive?: boolean;
  subtitle?: string;
  title?: HTMLWidget;
  description?: HTMLWidget;
  duration?: string;
  logos?: Logo[];
  logoPosition?: "after-title" | "before-title";
  button?: ButtonProps;
}

export default function Banner(
  {
    subtitle,
    title,
    description,
    alt,
    alignment,
    duration,
    desktop,
    mobile,
    bgImageAlt,
    link,
    targetBlankActive,
    logos = [],
    logoPosition,
    lcp = false,
    backgroundColor,
    textColor = "#000",
    button,
  }: BannerProps,
) {
  return (
    <div
      style={{ backgroundColor: backgroundColor, color: textColor }}
      class="md:card md:rounded-none w-full h-full image-full items-center"
    >
      <a
        href={link || "#"}
        target={targetBlankActive ? "_blank" : "_self"}
        aria-label={bgImageAlt}
      >
        <Picture preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile.image}
            width={mobile.width || 768}
            height={mobile.height || 972}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop.image}
            width={desktop.width || 1280}
            height={desktop.height || 514}
          />
          <img
            class="object-cover w-full h-full"
            loading={lcp ? "eager" : "lazy"}
            src={desktop.image}
            alt={alt}
          />
        </Picture>
      </a>

      <div
        class={`${
          alignment === "center" ? "items-center md:items-start" : "items-start"
        } card-body px-16 w-full md:max-w-2xl`}
      >
        {logos && logoPosition === "before-title" && (
          <div class="card-actions justify-start grid md:grid-cols-2 pt-12 gap-x-16 gap-y-8 pb-12">
            {logos?.map((logo) => (
              <Image
                class="object-center"
                src={logo?.image}
                alt={logo?.alt}
                width={180}
                height={60}
                loading="lazy"
              />
            ))}
          </div>
        )}
        {subtitle && (
          <span class="text-highlight-blue font-bold text-normal pt-3">
            {subtitle}
          </span>
        )}
        {title && (
          <div
            class={`${textColor} card-title font-normal text-2xl lg:text-4xl`}
            dangerouslySetInnerHTML={{ __html: title || "" }}
          />
        )}
        {description && (
          <div
            class={`${textColor} text-normal pt-3`}
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        )}
        {duration && (
          <span class={`${textColor} pt-4 uppercase text-sm font-bold`}>
            {duration}
          </span>
        )}

        {button && (
          <div class="mt-4">
            <Button {...button} />
          </div>
        )}

        {logos && logoPosition === "after-title" && (
          <div class="card-actions justify-start grid md:grid-cols-2 pt-12 gap-x-16 gap-y-8 pb-12">
            {logos?.map((logo) => (
              <Image
                class="object-center"
                src={logo?.image}
                alt={logo?.alt}
                width={180}
                height={60}
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
