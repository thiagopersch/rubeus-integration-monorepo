import { listTbc } from "@/requests/queries/tbc";
import TBC from "@/templates/TBC";
import prefetchQuery from "@/utils/prefetch-query";
import protectedRoutes from "@/utils/protected-routes";
import { GetServerSidePropsContext } from "next";

function TBCPage() {
  return <TBC />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const dehydrateState = await prefetchQuery({
    key: "get-tbc",
    fetcher: () => listTbc(session),
  });

  return { props: { session, dehydrateState } };
}

TBCPage.auth = {
  module: "TBC",
};

export default TBCPage;
