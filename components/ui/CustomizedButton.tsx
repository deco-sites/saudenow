export interface Props {
  link?: string;
  target?: "_blank" | "_self";
  text?: string;
  /**
   * @format color-input
   */
  textColor?: string;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  type?:
    | "purple-to-blue"
    | "cyan-to-blue"
    | "green-to-blue"
    | "purple-to-pink"
    | "red-to-yellow"
    | "linear-gradient"
    | "customized";

  disabled?: boolean;
}

export default function CustomizedButton(
  { text, textColor, backgroundColor, link, target, type, disabled }: Props,
) {
  if (disabled) return null;

  const anchorTypeToClass: Record<string, string> = {
    "purple-to-blue":
      "from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300",
    "cyan-to-blue":
      "from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200",
    "green-to-blue":
      "from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200",
    "purple-to-pink":
      "from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200",
    "red-to-yellow":
      "from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100",
  };

  if (type === "linear-gradient") {
    return (
      <a
        href={link || "#"}
        target={target || "_blank"}
        style={{ color: textColor }}
        class="font-semibold leading-[29px] rounded-xl inline-flex items-center justify-center py-2 px-6 bg-gradient-to-r from-primary-linear-gradient to-secondary-linear-gradient lg:text-xl"
      >
        {text}
      </a>
    );
  }

  if (type === "customized") {
    return (
      <a
        href={link || "#"}
        target={target || "_blank"}
        style={{ color: textColor, backgroundColor: backgroundColor }}
        class="font-semibold leading-[29px] rounded-xl inline-flex items-center justify-center py-2 px-6 lg:text-xl"
      >
        {text}
      </a>
    );
  }

  return (
    <a
      href={link || "#"}
      target={target || "_blank"}
      style={{ color: textColor }}
      class={`${
        anchorTypeToClass[type ?? "purple-to-blue"]
      } relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br`}
    >
      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
        {text}
      </span>
    </a>
  );
}
