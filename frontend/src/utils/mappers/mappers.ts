import moment from "moment";

import { Client } from "../../models/client";
import { Tbc } from "@/models/tbc";
import { SentenceCategory } from "@/models/sentenceCategory";
import { Sentence } from "@/models/sentence";

export const clientMapper = (client: Client) => ({
  ...client,
  formattedCreatedAt: moment(client.created_at).format(
    "DD/MM/YYYY [às] HH:mm:ss",
  ),
  formattedUpdatedAt: moment(client.updated_at).format(
    "DD/MM/YYYY [às] HH:mm:ss",
  ),
});

export const tbcMapper = (tbc: Tbc) => ({
  ...tbc,
  formattedCreatedAt: moment(tbc.created_at).format("DD/MM/YYYY [às] HH:mm:ss"),
  formattedUpdatedAt: moment(tbc.updated_at).format("DD/MM/YYYY [às] HH:mm:ss"),
});

export const sentenceCategoryMapper = (sentenceCategory: SentenceCategory) => ({
  ...sentenceCategory,
  formattedCreatedAt: moment(sentenceCategory.created_at).format(
    "DD/MM/YYYY [às] HH:mm:ss",
  ),
  formattedUpdatedAt: moment(sentenceCategory.updated_at).format(
    "DD/MM/YYYY [às] HH:mm:ss",
  ),
});

export const sentenceMapper = (sentence: Sentence) => ({
  ...sentence,
  formattedCreatedAt: moment(sentence.created_at).format(
    "DD/MM/YYYY [às] HH:mm:ss",
  ),
  formattedUpdatedAt: moment(sentence.updated_at).format(
    "DD/MM/YYYY [às] HH:mm:ss",
  ),
});
