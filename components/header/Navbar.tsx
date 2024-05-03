import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { ButtonProps, Logo } from "$store/components/header/Header.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  { items, logo, logoPosition = "left", button, device }: {
    items: SiteNavigationElement[];
    logo?: Logo;
    logoPosition?: "left" | "center";
    device: "mobile" | "desktop" | "tablet";
    button?: ButtonProps;
  },
) {
  const platform = usePlatform();

  // Mobile header
  if (device === "mobile") {
    return (
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden flex justify-between items-center w-full px-6 py-4 gap-2"
      >
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}
        <MenuButton />
      </div>
    );
  }

  // Desktop header
  return (
    <div class="hidden sm:grid sm:grid-cols-2 items-center w-full px-6 container mx-auto">
      <div
        class={`flex items-center gap-3 col-span-1 ${
          logoPosition === "left" ? "justify-end" : "justify-start"
        }`}
      >
        <ul class="flex gap-6">
          {items.map((item) => <NavItem item={item} />)}
        </ul>
        {button && !button.disabled && (
          <a
            href={button.link || "#"}
            target={button.target || "_blank"}
            style={{
              color: button.textColor,
              backgroundColor: button.backgroundColor,
            }}
            class="font-semibold leading-[29px] rounded-xl inline-flex items-center justify-center py-2 px-6 h-1/2"
          >
            {button.text}
          </a>
        )}
      </div>
      <div
        class={`flex ${
          logoPosition === "left" ? "justify-start -order-1" : "justify-center"
        }`}
      >
        {logo && (
          <a
            href="/"
            aria-label="Store logo"
            class="block"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}
      </div>
    </div>
  );
}

export default Navbar;
