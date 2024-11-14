import { useUI } from "../../sdk/useUI.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  const { displayMenu } = useUI();

  const component = item?.children?.length
    ? (
      <div class="collapse collapse-arrow">
        <input type="checkbox" />
        <div class="collapse-title min-h-0 p-0 py-2.5 font-bold text-xs px-4 flex items-center justify-between text-black duration-300 transition-colors">
          {item.name}
        </div>
        <div class="collapse-content px-0">
          <div class="px-0 py-2">
            {item.children?.map(({ name, url }) => (
              <ul class="pl-4 gap-1">
                <li>
                  <a
                    href={url}
                    class="w-full block font-normal text-sm text-white py-0.5 leading-[48px] hover:font-bold"
                  >
                    {name}
                  </a>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    )
    : (
      <a
        href={item.url}
        title={item.name}
        onClick={() => displayMenu.value = false}
        class="px-4 pt-2.5 text-xs font-bold leading-[46px]"
      >
        {item.name}
      </a>
    );

  return component;
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      {
        /* <ul class="flex flex-col py-2 bg-base-200">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="Heart" size={24} strokeWidth={2} />
            <span class="text-sm">Lista de desejos</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" size={24} strokeWidth={2} />
            <span class="text-sm">Nossas lojas</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Phone" size={24} strokeWidth={2} />
            <span class="text-sm">Fale conosco</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="User" size={24} strokeWidth={2} />
            <span class="text-sm">Minha conta</span>
          </a>
        </li>
      </ul> */
      }
    </div>
  );
}

export default Menu;
