import { Story, Meta } from "@storybook/react";
import { PlusCircle } from "@styled-icons/feather";

import Button, { ButtonProps } from ".";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    children: {
      type: "string",
    },
    icon: {
      type: undefined,
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    styleType: {
      control: { type: "select" },
      options: ["normal", "rounded", "outlined", "secondary", "circle"],
    },
  },
} as Meta;

export const Default: Story<ButtonProps> = (args) => <Button {...args} />;

Default.args = {
  children: "Pesquisar",
};

export const withIcon: Story<ButtonProps> = (args) => <Button {...args} />;

withIcon.args = {
  size: "large",
  children: "Adicionar Pessoa",
  icon: <PlusCircle />,
};

export const CircleWithIcon: Story<ButtonProps> = (args) => (
  <Button {...args} />
);

CircleWithIcon.args = {
  size: "large",
  icon: <PlusCircle />,
  styleType: "circle",
};
