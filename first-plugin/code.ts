figma.showUI(__html__);

figma.ui.resize(600, 700);

enum ImageVariant {
  no_image = "no_image",
  single_image = "single_image",
  carousel = "carousel",
}

interface Message {
  darkModeState: boolean;
  description: string;
  imageVariant: ImageVariant;
  name: string;
  username: string;
}

type PostVariantType = {
  [key in `${"dark" | "light"}_${ImageVariant}`]: string;
};

const types: PostVariantType = {
  dark_no_image: "Image=none, Dark mode=true",
  light_no_image: "Image=none, Dark mode=false",

  dark_single_image: "Image=single, Dark mode=true",
  light_single_image: "Image=single, Dark mode=false",

  dark_carousel: "Image=carousel, Dark mode=true",
  light_carousel: "Image=carousel, Dark mode=false",
};

figma.ui.onmessage = async (message: Message) => {
  await figma.loadFontAsync({ family: "Rubik", style: "Regular" });

  const { name, username, description, darkModeState, imageVariant } = message;

  const postComponentSet = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === "post",
  ) as ComponentSetNode;

  const mode = darkModeState ? "dark" : "light";
  const variantKey = `${mode}_${imageVariant}` as keyof PostVariantType;

  const variant = types[variantKey];

  const component = postComponentSet.findOne(
    (node) => node.type === "COMPONENT" && node.name === variant,
  ) as ComponentNode;

  const newPost = component.createInstance();

  const templateName = newPost.findOne(
    (node) => node.type === "TEXT" && node.name === "displayName",
  ) as TextNode;
  const templateUsername = newPost.findOne(
    (node) => node.type === "TEXT" && node.name === "@username",
  ) as TextNode;
  const templateDescription = newPost.findOne(
    (node) => node.type === "TEXT" && node.name === "description",
  ) as TextNode;

  const numLinks = newPost.findOne(
    (node) => node.type === "TEXT" && node.name === "likesLabel",
  ) as TextNode;

  const numComments = newPost.findOne(
    (node) => node.type === "TEXT" && node.name === "commentsLabel",
  ) as TextNode;

  templateName.characters = name;
  templateUsername.characters = username;
  templateDescription.characters = description;
  numLinks.characters = (Math.floor(Math.random() * 1000) + 1).toString();
  numComments.characters = (Math.floor(Math.random() * 1000) + 1).toString();

  figma.viewport.scrollAndZoomIntoView([newPost]);

  figma.closePlugin();
};

//   const defaultVariant = postComponentSet.defaultVariant as ComponentNode;
//   const test = postComponentSet.findOne( (node) => node.type === "COMPONENT" && node.name === "Image=single, Dark mode=true", ) as ComponentNode;
