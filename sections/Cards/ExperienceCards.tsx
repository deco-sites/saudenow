interface Card {
  title: string;
  subtitle: string;
}

export interface Props {
  /**
   * @format rich-text
   */
  title: string;
  cards: Card[];
}

export default function ExperienceCards({ title, cards = [] }: Props) {
  return (
    <div class="flex items-center justify-center w-full px-4 py-16 bg-black">
      <div class="flex flex-col gap-11 items-center justify-center text-center max-w-5xl mx-auto">
        <div
          dangerouslySetInnerHTML={{ __html: title || "" }}
          class="tracking-wide leading-tight"
        />

        <ul class="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-6 lg:gap-12 w-full">
          {cards.map(({ title, subtitle }) => (
            <li class="flex flex-col items-center justify-center gap-3.5 border-experience-linear-gradient p-7 text-white max-w-[359px] min-h-[230px] max-h-[230px]">
              <span class="font-bold text-xl leading-7 text-center">
                {title}
              </span>

              <p class="font-normal text-lg leading-6 text-center">
                {subtitle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
