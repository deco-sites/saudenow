import { Picture, Source } from "apps/website/components/Picture.tsx";
import Button from "$store/components/ui/Button.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href?: string;
    /** @description Image text title */
    title?: string;
    /** @description Image text subtitle */
    subTitle?: string;
    /** @description Button label */
    label?: string;
  };
}

export interface Props {
  image?: Banner;
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  lcp?: boolean;
  /**
   * @title Tamanho das imagens
   */
  sizes?: {
    /**
     * @title altura imagem mobile em px
     * @default 565
     */
    mobileHeight?: number;
    /**
     * @title largura imagem mobile em px
     * @default 390
     */
    mobileWidth?: number;
    /**
     * @description altura imagem deskto pem px
     * @default 411
     */
    desktopHeight?: number;
    /**
     * @default 1440
     */
    desktopWidth?: number;
  };
}

export default function Image({ image, lcp = false, sizes }: Props) {
  if (!image) return null;

  const { alt, mobile, desktop, action } = image;

  if (!image?.action && !image?.action?.href) {
    return (
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={sizes?.mobileWidth || 390}
          height={sizes?.mobileHeight || 565}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={sizes?.desktopWidth || 1440}
          height={sizes?.desktopHeight || 411}
        />
        <img
          class="w-full h-auto"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    );
  }

  return (
    <a
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative overflow-y-hidden w-full"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={sizes?.mobileWidth || 390}
          height={sizes?.mobileHeight || 565}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={sizes?.desktopWidth || 1440}
          height={sizes?.desktopHeight || 411}
        />
        <img
          class="w-full h-auto"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
      {action && (action?.title || action?.subTitle || action.label) && (
        <div class="absolute top-0 bottom-0 m-auto left-0 right-0 sm:right-auto sm:left-[12%] max-h-min max-w-[235px] flex flex-col gap-4 p-4 rounded glass">
          <span class="text-6xl font-medium text-base-100">
            {action.title}
          </span>
          <span class="font-medium text-xl text-base-100">
            {action.subTitle}
          </span>
          <Button class="glass">{action.label}</Button>
        </div>
      )}
    </a>
  );
}
