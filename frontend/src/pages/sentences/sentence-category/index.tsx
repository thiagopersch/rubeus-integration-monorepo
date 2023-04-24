import { GetServerSidePropsContext } from "next";

import SentenceCategories from "@/templates/SentenceCategory";

import { listSentenceCategory } from "@/requests/queries/sentenceCategory";

import prefetchQuery from "@/utils/prefetch-query";
import protectedRoutes from "@/utils/protected-routes";

function SentenceCategoryPage() {
  return <SentenceCategories />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const dehydrateState = await prefetchQuery({
    key: "get-sentence-category",
    fetcher: () => listSentenceCategory(session),
  });

  return {
    props: {
      session,
      dehydrateState,
    },
  };
}

// SentencePage.auth = {
//   module: "tbc",
// };

export default SentenceCategoryPage;
