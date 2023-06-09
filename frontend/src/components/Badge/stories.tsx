import { Story, Meta } from "@storybook/react";
import Badge, { BadgeProps } from ".";

export default {
  title: "Badge",
  component: Badge,
  argsTypes: {
    children: {
      type: "string",
    },
    styledType: {
      control: { type: "select" },
      options: ["success", "lightGrey", "blue", "orange", "danger", "lightRed"],
    },
  },
} as Meta;

export const Default: Story<BadgeProps> = (args) => <Badge {...args} />;

Default.args = {
  children: "My badge",
  styledType: "success",
};
