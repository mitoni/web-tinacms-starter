import { ComponentProps } from "react";
import { Collection } from "tinacms";
import { PageAndMenuQuery } from "../../../tina/__generated__/types";

type Props = ComponentProps<"main"> & PageAndMenuQuery;

export default function Page(props: Props) {
  return <div>Page</div>;
}

export const page: Collection = {
  name: "page",
  label: "Page",
  path: "layout/page",
  ui: {
    router({ document }) {
      return document._sys.title;
    },
  },
  fields: [
    {
      name: "url",
      label: "URL",
      type: "string",
      required: true,
      isTitle: true,
      ui: {
        defaultValue: "/",
      },
    },
    // {
    //   name: "sections",
    //   label: "Sections",
    //   type: "object",
    //   list: true,
    //   templates: [centered, columns, bubble, background_image, script],
    // },
  ],
};
