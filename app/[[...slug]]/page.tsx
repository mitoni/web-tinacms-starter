import { notFound } from "next/navigation";
import { client } from "../../tina/__generated__/databaseClient";

import Preprocessor from "../../components/preprocessor/preprocessor";

export default async function Slug({
  params,
}: {
  params: { slug: string | string[] };
}) {
  const url =
    "/" +
    (
      (Array.isArray(params?.slug) ? params?.slug : [params?.slug]) ?? [""]
    ).join("/");

  const connection = await client.queries.pageConnection();
  const page = connection.data.pageConnection.edges?.find(
    (edge) => edge?.node?.url === url
  );

  const id = page?.node?._sys.relativePath;

  if (!id) {
    notFound();
  }

  const props = await client.queries.pageAndMenu({ relativePath: id });

  return <Preprocessor {...JSON.parse(JSON.stringify(props))} />;
}
