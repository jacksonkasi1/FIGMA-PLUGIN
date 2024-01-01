import { useState } from "preact/hooks";
import { h, JSX } from "preact";
import {
  render,
  Text,
  Toggle,
  Textbox,
  TextboxMultiline,
  RadioButtons,
  RadioButtonsOption,
  Container,
  Button,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";

function Plugin() {
  const [data, setData] = useState({
    username: "",
    name: "",
    description: "",
    darkMode: false,
    imageVariant: "no_image",
  });

  function handleInputChange(
    event: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { id, value } = event.currentTarget;
    setData({ ...data, [id]: value });
  }

  function handleDarkModeToggle(event: JSX.TargetedEvent<HTMLInputElement>) {
    setData({ ...data, darkMode: event.currentTarget.checked });
  }

  function handleSubmit() {
    emit("SUBMIT", data);
  }

  const options: Array<RadioButtonsOption> = [
    { children: <Text>No Image</Text>, value: "no_image" },
    { children: <Text>Single Image</Text>, value: "single_image" },
    { children: <Text>Carousel</Text>, value: "carousel" },
  ];

  return (
    <Container space="medium">
      <div>
        <label for="UserEmail" class="block text-xs font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          id="UserEmail"
          placeholder="john@rhcp.com"
          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        />
      </div>

      <Text className="text-3xl font-bold underline">Petma Plugin</Text>
      <Textbox
        id="username"
        placeholder="Enter your username"
        onInput={handleInputChange}
        value={data.username}
        variant="border"
      />
      <Textbox
        id="name"
        placeholder="Enter your name"
        onInput={handleInputChange}
        value={data.name}
        variant="border"
      />
      <TextboxMultiline
        id="description"
        placeholder="Enter your description"
        onInput={handleInputChange}
        value={data.description}
        variant="border"
      />
      <Toggle onChange={handleDarkModeToggle} value={data.darkMode}>
        <Text>Dark mode</Text>
      </Toggle>
      <RadioButtons
        onChange={handleInputChange}
        options={options}
        value={data.imageVariant}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Container>
  );
}

export default render(Plugin);
