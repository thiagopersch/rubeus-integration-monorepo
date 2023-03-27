import { Story, Meta } from "@storybook/react";

import Collapse from ".";

export default {
  title: "Collapse",
  component: Collapse,
  args: {
    label: "Collapse",
    children: "Collapse",
  },
  argTypes: {
    label: { type: "string" },
    children: { type: "string" },
  },
  label: {
    type: "string",
  },
} as Meta;

export const Default: Story = (args) => <Collapse {...args} />;

Default.args = {
  label: "Nome da categoria",
  children: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis rerum quaerat voluptatem nisi reprehenderit natus eum sapiente optio beatae! Nulla asperiores quisquam consequatur doloribus. Beatae ratione sed animi dolorem architecto?`,
};
