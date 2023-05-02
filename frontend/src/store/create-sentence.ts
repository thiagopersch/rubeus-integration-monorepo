import { atomWithReset } from "jotai/utils";

import { BasicSentenceFormType } from "@/models/sentence";

export const basicSentenceData = atomWithReset<BasicSentenceFormType>(
  {} as BasicSentenceFormType,
);
