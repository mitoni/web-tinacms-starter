"use client";

import { useTina } from "tinacms/dist/react";
import Page from "../layout/page/page";
import { PageAndMenuQuery } from "../../tina/__generated__/types";

export default function Preprocessor(props: Parameters<typeof useTina>[0]) {
  const { data } = useTina(props);
  return <Page {...(data as PageAndMenuQuery)} />;
}
