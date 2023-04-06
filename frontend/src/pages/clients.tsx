import { GetServerSidePropsContext } from "next";

import prefetchQuery from "@/utils/prefetch-query";
import protectedRoutes from "@/utils/protected-routes";

import Client from "@/templates/Client";
import { listClients } from "@/requests/queries/clients";

function ClientPage() {
  return <Client />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const dehydrateState = await prefetchQuery({
    key: "get-client",
    fetcher: () => listClients(session),
  });

  return { props: { session, dehydrateState } };
}

ClientPage.auth = {
  module: "CLIENT",
};

export default ClientPage;
