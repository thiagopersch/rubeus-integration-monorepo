import { GetServerSidePropsContext } from "next";

import Sentence from "@/templates/Sentence";
import { listSentence } from "@/requests/queries/sentence";

import prefetchQuery from "@/utils/prefetch-query";
import protectedRoutes from "@/utils/protected-routes";

function SentencePage() {
  return <Sentence />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const dehydrateState = await prefetchQuery({
    key: "get-sentence",
    fetcher: () => listSentence(session),
  });

  return {
    props: {
      session,
      dehydrateState,
    },
  };
}

// SentencePage.auth = {
//   module: "sentence",
// };

export default SentencePage;
