export interface Props {
  link?: string;
  target?: "_blank" | "_self";
  text?: string;
  type?:
    | "purple-to-blue"
    | "cyan-to-blue"
    | "green-to-blue"
    | "purple-to-pink"
    | "red-to-yellow";
}

export default function CustomizedButton(
  { text, link, target = "_blank", type = "purple-to-blue" }: Props,
) {
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

  return (
    <a
      href={link || "#"}
      target={target}
      class={`${
        anchorTypeToClass[type]
      } relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br`}
    >
      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
        {text}
      </span>
    </a>
  );
}
