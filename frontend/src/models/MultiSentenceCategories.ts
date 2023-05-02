import { SentenceCategory } from "./sentenceCategory";

export type MultiSentenceCategories = SentenceCategory & {
  sentenceCategories: SentenceCategory[];
};
