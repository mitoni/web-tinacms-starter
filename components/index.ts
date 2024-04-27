import dynamic from "next/dynamic";

export const components = {
  page: dynamic(() => import("./layout/page/page")),
};
