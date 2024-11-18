import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Profile {
  src: ImageWidget;
  alt: string;
  /** @format rich-text */
  description: string;
}

export interface Image {
  src: ImageWidget;
  width?: number;
  height?: number;
  alt: string;
}

export interface Props {
  /** @format rich-text */
  title: string;
  image: Image;
  profiles: Profile[];
  cta?: {
    link: string;
    target?: "_blank" | "_self";
    label: string;
  };
}

export default function EventSchedule({
  title,
  image,
  profiles = [],
  cta,
}: Props) {
  return (
    <section class="relative w-full bg-black overflow-hidden">
      {/* Backdrop image container with opacity effect */}
      <div class="absolute inset-0 z-10">
        <Image
          class="w-full h-full object-cover opacity-60"
          src={image.src}
          alt={image.alt}
          width={image.width || 1921}
          height={image.height || 907}
        />
        {/* Optional backdrop overlay */}
        <div class="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* Main content container */}
      <div class="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Title */}
        {title && (
          <div
            dangerouslySetInnerHTML={{ __html: title || "" }}
            class="text-white text-3xl font-bold mb-10"
          />
        )}

        {/* Profiles list */}
        <div class="flex flex-col items-center gap-10 w-full">
          {profiles.map((profile, index) => {
            const isLastIndex = index === profiles.length - 1;

            return (
              <div
                key={index}
                class="flex flex-col md:flex-row gap-8 items-center justify-center"
              >
                <Image
                  class="rounded-full"
                  src={profile.src}
                  alt={profile.alt}
                  width={134}
                  height={134}
                />

                <div class="flex flex-col gap-4 text-white text-center md:text-left lg:min-w-[777px] max-w-[777px]">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: profile.description || "",
                    }}
                  />
                  {!isLastIndex && (
                    <div class="flex items-center justify-center h-0.5 bg-gradient-to-r from-lemon to-soft-violet w-4/5" />
                  )}
                </div>
              </div>
            );
          })}

          {/* CTA Button */}
          {cta && (
            <a
              href={cta.link}
              target={cta.target || "_self"}
              class="bg-lemon px-8 py-3 text-black text-xl font-bold rounded-lg mt-10"
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
