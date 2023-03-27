import { Meta, Story } from "@storybook/react";

import Footer, { FooterProps } from ".";

export default {
  title: "Footer",
  component: Footer,
  args: {
    children: `<p><a href="https://github.com/thiagopersch">Feito com ❤ por Tiago Persch</a></p>`,
  },
  icon: {
    type: undefined,
  },
} as Meta;

export const Template: Story<FooterProps> = (args) => {
  return (
    <div style={{ height: "100%" }}>
      <Footer {...args} />
    </div>
  );
};
