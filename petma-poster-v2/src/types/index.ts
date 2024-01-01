enum ImageVariant {
  no_image = "no_image",
  single_image = "single_image",
  carousel = "carousel",
}

export interface Message {
  darkModeState: boolean;
  description: string;
  imageVariant: ImageVariant;
  name: string;
  username: string;
}

export type PostVariantType = {
  [key in `${"dark" | "light"}_${ImageVariant}`]: string;
};

export const types: PostVariantType = {
  dark_no_image: "Image=none, Dark mode=true",
  light_no_image: "Image=none, Dark mode=false",

  dark_single_image: "Image=single, Dark mode=true",
  light_single_image: "Image=single, Dark mode=false",

  dark_carousel: "Image=carousel, Dark mode=true",
  light_carousel: "Image=carousel, Dark mode=false",
};
