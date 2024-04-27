import { ComponentPropsWithoutRef } from "react";
import { Collection } from "tinacms";
import { MenuPartsFragment } from "../../../tina/__generated__/types";

type Props = ComponentPropsWithoutRef<"div"> & MenuPartsFragment;

type ItemProps = ComponentPropsWithoutRef<"a"> & {
  label: React.ReactNode;
  url: string;
};

function MenuItem(props: ItemProps) {
  const { label, url } = props;
  return <a></a>;
}

function Menu(props: Props) {
  const { links } = props;
  return <div></div>;
}

export const menu: Collection = {
  name: "menu",
  label: "Menu",
  path: "sections/menu",
  ui: {
    allowedActions: {
      // Uncomment after creating the menu collection
      // create: false,
      // delete: false,
    },
    filename: {
      readonly: true,
      slugify() {
        return "menu";
      },
    },
  },
  fields: [
    {
      name: "links",
      label: "Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.label };
        },
      },
      fields: [
        {
          name: "url",
          label: "URL",
          type: "string",
          required: true,
        },
        {
          name: "label",
          label: "Label",
          type: "string",
          required: true,
          isTitle: true,
        },
      ],
    },
  ],
};

export default Menu;
