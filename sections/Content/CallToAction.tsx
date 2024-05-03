import Button, {
  Props as ButtonProps,
} from "$store/components/ui/CustomizedButton.tsx";

import Image from "apps/website/components/Image.tsx";

import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  text: HTMLWidget;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  backgroundImage?: {
    source?: ImageWidget;
    width?: number;
    height?: number;
  };
  button?: ButtonProps;
  position?: "flex-row" | "flex-col" | "flex-row-reverse" | "flex-col-reverse";
  hasContainerClass?: boolean;
  hasPaddingOnTop?: boolean;
}

export default function CallToAction(
  {
    text,
    backgroundImage,
    backgroundColor,
    button,
    position = "flex-row",
    hasPaddingOnTop = false,
    hasContainerClass = false,
  }: Props,
) {
  return (
    <div
      style={{ backgroundColor: !backgroundImage ? backgroundColor : "" }}
      class={`flex items-center justify-center w-full h-full ${
        hasPaddingOnTop ? "py-4" : ""
      }`}
    >
      <div
        class={`flex items-center justify-center relative w-full ${
          hasContainerClass ? "container px-6 xl:px-0" : ""
        }`}
      >
        {backgroundImage && (
          <Image
            src={backgroundImage.source || ""}
            width={backgroundImage.width || 1920}
            height={backgroundImage.height || 720}
            loading="lazy"
            decoding="async"
            class="bg-cover bg-center w-full h-full absolute z-10"
          />
        )}

        <div
          class={`flex items-center justify-center w-full gap-6 lg:gap-20 z-20 pb-6 ${position} ${
            hasContainerClass ? "container" : ""
          }`}
        >
          <div dangerouslySetInnerHTML={{ __html: text || "" }} />
          {button && <Button {...button} />}
        </div>
      </div>
    </div>
  );
}
