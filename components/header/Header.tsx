import { AppContext } from "$store/apps/site.ts";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface ButtonProps {
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

  disabled?: boolean;
}

export interface Props {
  alerts?: string[];
  height?: string;
  disableMenuButton?: boolean;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;

  logoPosition?: "left" | "center";

  button?: ButtonProps;
  /**
   * @format color-input
   */
  textColor?: string;
  /**
   * @format color-input
   */
  backgroundColor?: string;
}

function Header({
  alerts,
  navItems = [],
  disableMenuButton,
  height,
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "center",
  textColor,
  backgroundColor,
  button,
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: height || headerHeight }}>
        <Drawers
          menu={{ items }}
          platform={platform}
        >
          <div
            style={{ backgroundColor: backgroundColor, color: textColor }}
            class="fixed w-full z-50"
          >
            {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
            <Navbar
              device={device}
              items={items}
              logo={logo}
              button={button}
              logoPosition={logoPosition}
              disableMenuButton={disableMenuButton}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
