import Button, {
  Props as ButtonProps,
} from "$store/components/ui/CustomizedButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface UserProps {
  avatar?: ImageWidget;
  width?: number;
  height?: number;
  /** @format html */
  name?: string;
  position?: string;
  company?: string;
}

export interface Testimonial {
  /** @format html */
  text?: string;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
  user?: UserProps;
  position?: "flex-row" | "flex-row-reverse" | "flex-col" | "flex-col-reverse";
  isCard?: boolean;
  /** @format color */
  backgroundColor?: string;
}

export interface Props {
  /** @format html */
  title?: string;
  /** @format html */
  description?: string;
  testimonials?: Testimonial[];
  layout?: {
    variation?: "Grid" | "Slider";
    headerAlignment?: "center" | "left";
    position?: "flex-col" | "flex-row";
    desktopPosition?: "lg:flex-col" | "lg:flex-row";
  };
  button?: ButtonProps;
  /** @format color */
  backgroundColor?: string;
  maxWidth?:
    | "max-w-[50%]"
    | "max-w-[60%]"
    | "max-w-[70%]"
    | "max-w-[80%]"
    | "max-w-[90%]"
    | "max-w-[95%]"
    | "max-w-full";
}

function Header({
  title,
  description,
  alignment,
  position,
  desktopPosition,
}: Pick<Props, "title" | "description"> & {
  alignment: "center" | "left";
  position?: "flex-col" | "flex-row";
  desktopPosition?: "lg:flex-col" | "lg:flex-row";
}) {
  return (
    <div
      class={`${
        alignment === "center" && "text-center items-center justify-center"
      } flex ${position} ${desktopPosition} justify-between w-full gap-2.5`}
    >
      {title && <div dangerouslySetInnerHTML={{ __html: title }} />}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  );
}

const Testimonal = (
  { image, text, user, position = "flex-col", isCard = false, backgroundColor }:
    Testimonial,
) => (
  <div
    style={{ backgroundColor: backgroundColor }}
    class={`flex items-center gap-9 text-center ${position} ${
      isCard && "py-8 px-3 rounded-md !gap-4"
    }`}
  >
    {image?.src && (
      <Image
        src={image.src}
        alt={image?.alt}
        width={100}
        height={100}
      />
    )}
    {text && (
      <div
        class="text-xl lg:text-2xl"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )}
    <div class="flex flex-col items-center gap-4">
      {user?.avatar && (
        <Image
          src={user.avatar}
          alt={user?.name}
          width={user?.width || 120}
          height={user?.height || 120}
          class="rounded-full"
        />
      )}
      <div class="flex flex-col">
        {user?.name &&
          (
            <div
              class="text-lg"
              dangerouslySetInnerHTML={{ __html: user?.name || "" }}
            />
          )}
        {(user?.position || user?.company) &&
          (
            <p class="text-lg">
              {user?.position}, {user?.company}
            </p>
          )}
      </div>
    </div>
  </div>
);

export default function Testimonials({
  title,
  description,
  testimonials = [],
  layout,
  backgroundColor,
  button,
  maxWidth,
}: Props) {
  const id = useId();

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      class="flex items-center justify-center w-full h-full"
    >
      <div
        class={`${maxWidth} w-full container px-4 py-8 flex flex-col items-center justify-center gap-14 lg:gap-20 lg:py-10 lg:px-0`}
      >
        <Header
          title={title}
          description={description}
          alignment={layout?.headerAlignment || "center"}
          position={layout?.position || "flex-col"}
          desktopPosition={layout?.desktopPosition || "lg:flex-row"}
        />

        {layout?.variation === "Grid" && (
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {testimonials?.map((testimonial) => (
              <Testimonal {...testimonial} />
            ))}
          </div>
        )}

        {layout?.variation !== "Grid" && (
          <div
            class="relative w-full px-8"
            id={id}
          >
            <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 w-full">
              {testimonials?.map((testimonial, index) => (
                <Slider.Item
                  index={index}
                  class="flex flex-col gap-4 carousel-item w-full"
                >
                  <Testimonal {...testimonial} />
                </Slider.Item>
              ))}
            </Slider>
            <>
              <div class="z-10 absolute -left-2 lg:-left-8 top-1/2">
                <Slider.PrevButton class="btn btn-circle btn-outline">
                  <Icon size={24} id="ChevronLeft" strokeWidth={3} />
                </Slider.PrevButton>
              </div>
              <div class="z-10 absolute -right-2 lg:-right-8 top-1/2">
                <Slider.NextButton class="btn btn-circle btn-outline">
                  <Icon size={24} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
            <SliderJS rootId={id} />
          </div>
        )}

        <div>
          {button && <Button {...button} />}
        </div>
      </div>
    </div>
  );
}
