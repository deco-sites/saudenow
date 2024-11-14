import Icon from "deco-sites/saudenow/components/ui/Icon.tsx";
import { formatDate } from "deco-sites/saudenow/sdk/format.ts";

interface Card {
  title: string;
  price: string;
  /**
   * @format date-time
   */
  availableAt: string;
  /**
   * @format date-time
   */
  endsAt: string;
  showDate?: boolean;
  cta: {
    label: string;
    href: string;
    target: "_blank" | "_self";
    isBlocked?: boolean;
  };
}

export interface Props {
  /**
   * @format rich-text
   */
  title: string;
  /**
   * @format textarea
   */
  subtitle?: string;
  cards?: Card[];
}

export default function SubscriptionCards(
  { title, subtitle, cards = [] }: Props,
) {
  return (
    <div class="flex items-center justify-center w-full px-4 py-16 bg-black">
      <div class="flex flex-col gap-11 items-center justify-center text-center max-w-5xl mx-auto text-white">
        <div class="flex flex-col gap-5 items-center justify-center w-full">
          <div
            dangerouslySetInnerHTML={{ __html: title || "" }}
            class="tracking-wide leading-tight"
          />

          {subtitle && <p class="font-medium text-xl text-center">{subtitle}
          </p>}
        </div>

        <ul class="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center lg:justify-between gap-12 w-full">
          {cards.map(({ title, price, availableAt, endsAt, showDate, cta }) => {
            const now = new Date();

            const availableDate = availableAt ? new Date(availableAt) : null;
            const endsDate = endsAt ? new Date(endsAt) : null;

            const isBlocked = (availableDate && now < availableDate) || // Se a data atual for antes de availableAt
              (endsDate && now > endsDate) || // Se a data atual for depois de endsAt
              (!availableAt) || // Se não houver availableAt, o item está bloqueado.
              cta.isBlocked; // Se o cta estiver marcado como bloqueado.

            const formattedAvailableAt = formatDate(availableAt);
            const formattedEndsAt = formatDate(endsAt);

            return (
              <li class="flex flex-col items-center justify-between gap-4 pt-4 px-6 rounded-t-2xl bg-white text-black max-w-[400px] min-h-[242px] max-h-[242px] relative">
                {isBlocked && (
                  <div class="absolute -top-2 -left-4 z-10">
                    <BlockedIcon />
                  </div>
                )}

                <div class="flex flex-col gap-3 items-center justify-center w-full">
                  <h2 class="font-black text-2xl text-center">
                    {title}
                  </h2>

                  <div class="w-14 h-2 rounded-full bg-soft-violet" />
                </div>

                {showDate && (
                  <div class="flex items-center justify-center w-full gap-1.5">
                    <Icon
                      id="Calendar"
                      width={27}
                      height={28}
                      loading="lazy"
                    />

                    <span class="font-bold leading-5">
                      de {formattedAvailableAt} a {formattedEndsAt}
                    </span>
                  </div>
                )}

                {price && (
                  <p class="flex items-end justify-center gap-2 font-black text-center">
                    <span class="text-lemon text-4xl">R$</span>
                    <span class="text-black text-6xl">{price}</span>
                  </p>
                )}

                {isBlocked
                  ? (
                    <a
                      href={cta.href ?? "#"}
                      target={cta.target ?? "_blank"}
                      class={`flex items-center justify-center h-14 w-full mx-auto font-bold cursor-not-allowed text-white bg-[#D0D0D0] hover:scale-105 duration-300 ease-in-out text-lg px-4 rounded-xl ${
                        showDate ? "shrink-0" : "translate-y-4"
                      }`}
                    >
                      {cta.label}
                    </a>
                  )
                  : (
                    <a
                      href={cta.href ?? "#"}
                      target={cta.target ?? "_blank"}
                      class={`flex items-center justify-center h-14 w-full mx-auto font-bold bg-lemon hover:scale-105 duration-300 ease-in-out text-black text-lg px-4 rounded-xl ${
                        showDate ? "shrink-0" : "translate-y-4"
                      }`}
                    >
                      {cta.label}
                    </a>
                  )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function BlockedIcon() {
  return (
    <svg
      width="59"
      height="59"
      viewBox="0 0 59 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.4999 31.7593C27.806 31.7593 26.4323 33.1324 26.4323 34.8269C26.4323 35.9629 27.0516 36.9523 27.9696 37.483V40.8934H31.0302V37.483C31.9482 36.9525 32.5676 35.9629 32.5676 34.8269C32.5676 33.1324 31.194 31.7593 29.4999 31.7593Z"
        fill="#C45EFF"
      />
      <path
        d="M29.5011 16.8838C26.9226 16.8838 24.8253 18.9813 24.8253 21.5596V26.5391H34.1765V21.5596C34.1763 18.9817 32.0791 16.8838 29.5011 16.8838Z"
        fill="#C45EFF"
      />
      <path
        d="M29.4995 0C13.2076 0 0 13.208 0 29.4999C0 45.7914 13.2076 58.9998 29.4995 58.9998C45.7914 58.9998 59 45.7912 59 29.4999C59 13.208 45.7914 0 29.4995 0ZM38.564 44.6671H20.4364C18.522 44.6671 16.9699 43.1149 16.9699 41.2V30.0057C16.9699 28.3358 18.1512 26.9412 19.7238 26.6132V21.5593C19.7238 16.1688 24.1096 11.7827 29.5005 11.7827C34.891 11.7827 39.2767 16.1684 39.2767 21.5593V26.6132C40.8487 26.9422 42.0301 28.3358 42.0301 30.0057V41.2H42.0305C42.0305 43.1147 40.4784 44.6671 38.564 44.6671Z"
        fill="#C45EFF"
      />
    </svg>
  );
}
