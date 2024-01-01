import { showUI, on } from "@create-figma-plugin/utilities";

// ** import  types
import { types } from "./types";
import type { Message, PostVariantType } from "./types";

on("SUBMIT", async (message: Message) => {
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
});

export default function () {
  showUI({
    height: 360,
    width: 540,
  });
}
