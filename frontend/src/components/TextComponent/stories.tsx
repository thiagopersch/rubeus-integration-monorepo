import { Meta, Story } from "@storybook/react";

import TextComponent, { TextComponentProps } from ".";

export default {
  title: "TextComponent",
  component: TextComponent,
  args: {
    children: `
      Lorem ipsum dolor sit amet consectetur, 
      adipisicing elit. Non veniam ipsam explicabo repellat 
      vel cupiditate fuga voluptatem illum molestias libero? 
      Nulla architecto ipsa cumque vel, possimus accusantium 
      libero aspernatur eos?`,
  },
  argTypes: {
    children: { type: "string" },
  },
} as Meta;

export const Default: Story<TextComponentProps> = (args) => (
  <TextComponent {...args} />
);
