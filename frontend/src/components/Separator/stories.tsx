import { Story, Meta } from "@storybook/react";

import Separator from ".";

export default {
  title: "Separator",
  component: Separator,
  args: {
    Separator,
  },
} as Meta;

export const Default: Story = (args) => <Separator {...args} />;
