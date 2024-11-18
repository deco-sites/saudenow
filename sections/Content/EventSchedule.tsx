import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Profile {
  src: ImageWidget;
  alt: string;
  /** @format html */
  description: string;
}

export interface Image {
  src: ImageWidget;
  width: number;
  height: number;
  alt: string;
}

export interface Props {
  image: Image;  
  imageProfile: Profile[];
}

export default function EventSchedule ({image, imageProfile}: Props) {
  return (
    <section class="absolute w-full max-w-[1920px] max-h-[907px] bg-black ">
      <div class="w-full h-full absolute -z-10">
        <Image
          class="w-full object-cover"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height} 
        />
      </div>
      <div class="w-full h-full absolute flex flex-col items-center gap-10 mt-32">
        {imageProfile.map((profile) => (
          <div class="flex gap-5">
            <Image
              class="rounded-full"
              src={profile.src}
              alt={profile.alt}
              width={134}
              height={134}
            />

            <div class="text-white min-w-[777px] max-w-[777px] flex items-center justify-center">
              <p class="" dangerouslySetInnerHTML={{ __html: profile.description || "" }}/>
            </div>

          </div>
        ))}
        
        <button class="bg-[#00F8C2] px-8 py-2 text-black text-xl font-bold rounded-lg">
          INSCREVA-SE JÁ
        </button>
      </div>
    </section>
  )
}