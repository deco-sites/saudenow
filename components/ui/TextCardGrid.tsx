import Button, {
  Props as ButtonProps,
} from "$store/components/ui/CustomizedButton.tsx";

import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface TextCardProps {
  title?: HTMLWidget;
  description?: HTMLWidget;
  /**
   * @format color
   * @description Caso a cor de background sobreponha a cor do texto, modifique a cor do texto por meio da opção de HTML de cada um.
   * @default #fff
   */
  background?: string;

  /**
   * @format color
   * @default #ccc
   */
  borderColor?: string;
}

export interface Props {
  title?: HTMLWidget;
  /**
   * @format color
   * @default #ccc
   */
  backgroundColor?: string;

  cards?: TextCardProps[];

  button?: ButtonProps;

  hasContainerClass?: boolean;
}

function TextCard(
  { title, description, background, borderColor }: TextCardProps,
) {
  return (
    <div
      style={{ backgroundColor: background, borderColor: borderColor }}
      href="#"
      class={`${
        borderColor && "border"
      } flex flex-col max-w-sm p-6 rounded-lg shadow-md shadow-sky-500 gap-2`}
    >
      {title && <div dangerouslySetInnerHTML={{ __html: title }} />}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  );
}

export default function TextCardGrid({
  title,
  backgroundColor = "#ccc",
  cards = [],
  button,
  hasContainerClass = true,
}: Props) {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      class="flex items-center justify-center w-full h-full px-2 lg:px-0 py-3"
    >
      <div
        class={`${
          hasContainerClass && "container"
        } flex flex-col items-center justify-center gap-4 md:gap-10`}
      >
        {title && <div dangerouslySetInnerHTML={{ __html: title }} />}

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-1.5 gap-y-4">
          {cards?.map((card) => <TextCard {...card} />)}
        </div>

        {button && <Button {...button} />}
      </div>
    </div>
  );
}
