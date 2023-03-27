import { Story, Meta } from "@storybook/react";
import ToggleSwitch from ".";

export default {
  title: "ToggleSwitch",
  component: ToggleSwitch,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onCheck: {
      action: "checked",
    },
    disabled: {
      type: "boolean",
    },
  },
} as Meta;

export const Default: Story = (args) => <ToggleSwitch {...args} />;
