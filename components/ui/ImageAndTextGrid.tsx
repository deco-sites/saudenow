import Button, {
  Props as ButtonProps,
} from "$store/components/ui/CustomizedButton.tsx";
import Image from "apps/website/components/Image.tsx";

import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface Banner {
  bannerImage: {
    image: ImageWidget;
    description: string;
    width?: number;
    height?: number;
    preload?: boolean;
  };
  /**
   * @format color
   */
  backgroundColor?: string;
  backgroundImage?: {
    source?: ImageWidget;
    width?: number;
    height?: number;
  };
  title: HTMLWidget;
  description?: HTMLWidget;
  buttons?: ButtonProps[];
  mobilePosition?:
    | "flex-col"
    | "flex-row"
    | "flex-col-reverse"
    | "flex-row-reverse";
  mobileAlignment?: "items-start" | "items-center" | "items-end";
  desktopPosition?:
    | "flex-col"
    | "flex-row"
    | "flex-col-reverse"
    | "flex-row-reverse";
  desktopAlignment?: "items-start" | "items-center" | "items-end";
  titleAppearsFirst?: boolean;
  hasBorderClass?: boolean;
  hasContainerClass?: boolean;
  maxWidth?:
    | "max-w-[50%]"
    | "max-w-[60%]"
    | "max-w-[70%]"
    | "max-w-[80%]"
    | "max-w-[90%]"
    | "max-w-[95%]"
    | "max-w-full";
}

export interface Props {
  id?: string;
  banners?: Banner[];
  itemsPerLine: {
    /** @default 2 */
    mobile: 1 | 2;
    /** @default 4 */
    desktop: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  };
  hasContainerClass?: boolean;
  hasSpacement?: boolean;
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
  8: "lg:grid-cols-8",
};

const DESKTOP_POSITION: Record<string, string> = {
  "flex-col": "lg:flex-col",
  "flex-row": "lg:flex-row",
  "flex-col-reverse": "lg:flex-col-reverse",
  "flex-row-reverse": "lg:flex-row-reverse",
};

const DESKTOP_ALIGNMENT: Record<string, string> = {
  "items-start": "lg:items-start",
  "items-center": "lg:items-center",
  "items-end": "lg:items-end",
};

function ImageAndText({
  backgroundColor = "#fff",
  backgroundImage,
  title,
  description,
  buttons = [],
  bannerImage,
  mobilePosition = "flex-row",
  mobileAlignment = "items-center",
  desktopPosition = "flex-row",
  desktopAlignment = "items-start",
  titleAppearsFirst = false,
  hasBorderClass = false,
  hasContainerClass = false,
  maxWidth = "max-w-full",
}: Banner) {
  return (
    <div
      style={{ backgroundColor: !backgroundImage ? backgroundColor : "" }}
      class="flex justify-center w-full h-full items-center py-4 px-6 z-20 relative"
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
        class={`${
          hasContainerClass && "container"
        } flex justify-between w-full h-full items-center gap-3 z-20 ${maxWidth} ${mobilePosition} ${mobileAlignment} ${
          DESKTOP_POSITION[desktopPosition]
        } ${DESKTOP_ALIGNMENT[desktopAlignment]} ${
          hasBorderClass && "rounded-lg"
        }`}
      >
        {titleAppearsFirst && (
          <div class="flex flex-col gap-2.5 w-full">
            <div dangerouslySetInnerHTML={{ __html: title || "" }} />

            {description && (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        )}

        <Image
          src={bannerImage.image}
          alt={bannerImage.description}
          width={bannerImage.width || 350}
          height={bannerImage.height || 350}
          preload={bannerImage.preload || false}
          loading={bannerImage.preload ? "eager" : "lazy"}
        />

        <div
          class={`flex flex-col ${mobileAlignment} ${
            DESKTOP_ALIGNMENT[desktopAlignment]
          } gap-2.5 w-full`}
        >
          {!titleAppearsFirst && (
            <div class="flex flex-col gap-2.5 w-full">
              <div dangerouslySetInnerHTML={{ __html: title || "" }} />
              {description && (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </div>
          )}

          {buttons && buttons.length > 0 && (
            <ul class="flex flex-col lg:flex-row gap-4">
              {buttons.map((button) => <Button {...button} />)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ImageAndTextGrid(
  { id, banners, itemsPerLine, hasContainerClass, hasSpacement }: Props,
) {
  const { mobile, desktop } = itemsPerLine;

  return (
    <div
      id={id}
      class={`${MOBILE_COLUMNS[mobile]} ${DESKTOP_COLUMNS[desktop]} ${
        hasContainerClass && "container"
      } ${hasSpacement && "gap-6 py-4"} grid w-full`}
    >
      {banners?.map((banner) => <ImageAndText {...banner} />)}
    </div>
  );
}
