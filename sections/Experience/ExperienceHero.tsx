import Icon, {
    AvailableIcons,
} from "deco-sites/saudenow/components/ui/Icon.tsx";
import Button, {
    Props as ButtonProps,
} from "$store/components/ui/CustomizedButton.tsx";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface RichTextProps {
    /**
     * @format rich-text
     */
    label: string;
    leading?: string;
}

export interface AdditionalInfoProps {
    icon: AvailableIcons;
    title: RichTextProps;
}

export interface Props {
    title: RichTextProps;
    subtitle: RichTextProps;
    additionalInfos?: AdditionalInfoProps[];
    buttons?: ButtonProps[];
    experienceButtons?: ButtonProps[];
    image: {
        src: ImageWidget;
        description: string;
        width?: number;
        height?: number;
        loading?: "eager" | "lazy";
    };
    backgroundImage?: {
        source?: ImageWidget;
        width?: number;
        height?: number;
    };
}

export default function ExperienceHero(
    {
        title,
        subtitle,
        additionalInfos,
        buttons,
        experienceButtons,
        image,
        backgroundImage,
    }: Props,
) {
    return (
        <div class="flex items-center justify-center w-full h-full px-6 relative">
            {backgroundImage && (
                <Image
                    src={backgroundImage.source || ""}
                    width={backgroundImage.width || 1920}
                    height={backgroundImage.height || 720}
                    loading="lazy"
                    decoding="async"
                    class="bg-cover bg-center w-full h-full absolute z-10"
                />
            )}

            <div class="flex flex-col lg:Flex-row justify-center lg:max-w-[80%] mx-auto z-20">
                <aside class="flex flex-col gap-16 w-full lg:max-w-xl">
                    <div class="flex flex-col gap-3.5 w-full">
                        {title && (
                            <div
                                style={{ lineHeight: title.leading }}
                                dangerouslySetInnerHTML={{
                                    __html: title.label,
                                }}
                            />
                        )}

                        {subtitle && (
                            <div
                                style={{ lineHeight: subtitle.leading }}
                                dangerouslySetInnerHTML={{
                                    __html: subtitle.label,
                                }}
                            />
                        )}

                        {additionalInfos && additionalInfos.length > 0 && (
                            <ul class="flex lg:hidden items-center justify-center w-full gap-6">
                                {additionalInfos.map((item) => (
                                    <li class="flex items-center gap-2">
                                        <Icon id={item.icon} size={18} />
                                        <div
                                            style={{
                                                lineHeight: item.title.leading,
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: item.title.label,
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}

                        {buttons && buttons.length > 0 && (
                            <ul class="flex flex-col lg:flex-row gap-4 mt-4">
                                {buttons.map((button) => (
                                    <Button {...button} />
                                ))}
                            </ul>
                        )}
                    </div>

                    {experienceButtons && experienceButtons.length > 0 && (
                        <ul class="hidden lg:flex lg:flex-nowrap items-center justify-center lg:justify-start flex-row gap-6 mt-10 w-full">
                            {experienceButtons.map((button) => (
                                <Button {...button} />
                            ))}
                        </ul>
                    )}
                </aside>

                {image && (
                    <div class="h-full w-full">
                        <Image
                            src={image.src}
                            width={image.width || 959}
                            height={image.height || 880}
                            alt={image.description}
                            loading={image.loading || "eager"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
