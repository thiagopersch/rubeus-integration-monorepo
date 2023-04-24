import { GetServerSidePropsContext } from "next";

import prefetchQuery from "@/utils/prefetch-query";
import protectedRoutes from "@/utils/protected-routes";

import { listTbc } from "@/requests/queries/tbc";

import Tbcs from "@/templates/TBC";

function TBCPage() {
  return <Tbcs />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const dehydrateState = await prefetchQuery({
    key: "get-tbc",
    fetcher: () => listTbc(session),
  });

  return {
    props: {
      session,
      dehydrateState,
    },
  };
}

// TBCPage.auth = {
//   module: "tbc",
// };

export default TBCPage;
