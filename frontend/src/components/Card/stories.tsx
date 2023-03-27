import { Story, Meta } from "@storybook/react";

import Card, { CardProps } from ".";

export default {
  title: "Card",
  component: Card,
  argsTypes: {
    children: {
      type: "string",
    },
    icon: {
      type: "string",
    },
  },
} as Meta;

export const Default: Story<CardProps> = (args) => <Card {...args} />;

Default.args = {
  children: "150",
  description: "Alunos ativos",
  link: "/",
};
