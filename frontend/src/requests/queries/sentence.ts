import { useMemo } from "react";
import { Session } from "next-auth";
import { QueryObserverOptions, useQuery } from "react-query";

import { FormattedSentence, Sentence } from "@/models/sentence";

import { initializeApi } from "@/services/api";

import { sentenceMapper } from "@/utils/mappers/mappers";

type ListSentenceFilters = {
  id?: string;
  tbc_id?: string;
  sentence_category_id?: string;
  code?: string;
  name?: string;
  coligate?: string;
  system_code?: string;
  content?: string;
};

export const sentenceKeys = {
  all: "sentence" as const,
  lists: () => [...sentenceKeys.all, "list"] as const,
  list: (filters: string) => [...sentenceKeys.lists(), { filters }] as const,
  shows: () => [...sentenceKeys.all, "show"] as const,
  show: (filters: string) => [...sentenceKeys.shows(), { filters }] as const,
};

export const listSentence = (
  session?: Session | null,
  filters: ListSentenceFilters = {},
): Promise<FormattedSentence[]> => {
  const api = initializeApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  return api
    .get<Sentence[]>(`/sentence`, { params })
    .then((response) => response.data.map(sentenceMapper));
};

export const useListSentence = (
  session?: Session | null,
  filters: ListSentenceFilters = {},
  queryOptions: QueryObserverOptions<Sentence[]> = {},
) => {
  const key = useMemo(
    () => sentenceKeys.list(JSON.stringify(filters)),
    [filters],
  );

  const result = useQuery<Sentence[]>(
    key,
    () => listSentence(session),
    queryOptions,
  );

  return { ...result, key };
};

type ShowSentenceFilters = {
  id: string;
};

export const showSentence = (
  session: Session | null,
  filters: ShowSentenceFilters,
) => {
  const api = initializeApi(session);
  const { id } = filters;

  return api.get<Sentence>(`/sentence/${id}`).then((response) => response.data);
};

export const useShowSentence = (
  session: Session | null,
  filters: ShowSentenceFilters,
  queryOptions: QueryObserverOptions<Sentence> = {},
) => {
  const key = useMemo(
    () => sentenceKeys.show(JSON.stringify(filters)),
    [filters],
  );

  const result = useQuery<Sentence>(
    key,
    () => showSentence(session, filters),
    queryOptions,
  );
  return { ...result, key };
};
