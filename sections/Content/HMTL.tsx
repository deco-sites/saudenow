import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  html: HTMLWidget;
}

export default function HTML({ html }: Props) {
  if (!html) return null;

  return <div class="p-4" dangerouslySetInnerHTML={{ __html: html }} />;
}
