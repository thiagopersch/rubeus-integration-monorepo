import { useMemo } from "react";
import { Session } from "next-auth";
import { QueryObserverOptions, useQuery } from "react-query";

import {
  FormattedSentenceCategory,
  SentenceCategory,
} from "@/models/sentenceCategory";

import { initializeApi } from "@/services/api";

import { sentenceCategoryMapper } from "@/utils/mappers/mappers";

type ListSentenceCategoryFilters = {
  id?: string;
  name?: string;
  description?: string;
  status?: boolean;
};

export const sentenceCategoriesKeys = {
  all: "sentence-category" as const,
  lists: () => [...sentenceCategoriesKeys.all, "list"] as const,
  list: (filters: string) =>
    [...sentenceCategoriesKeys.lists(), { filters }] as const,
  shows: () => [...sentenceCategoriesKeys.all, "show"] as const,
  show: (filters: string) =>
    [...sentenceCategoriesKeys.shows(), { filters }] as const,
};

export const listSentenceCategory = (
  session?: Session | null,
  filters: ListSentenceCategoryFilters = {},
): Promise<FormattedSentenceCategory[]> => {
  const api = initializeApi(session);

  const { ...restParams } = filters;

  return api
    .get<SentenceCategory[]>("/sentence-category", { params: filters })
    .then((response) => response.data.map(sentenceCategoryMapper));
};

export const useListSentenceCategory = (
  session?: Session | null,
  filters: ListSentenceCategoryFilters = {},
  queryOptions: QueryObserverOptions<SentenceCategory[]> = {},
) => {
  const key = useMemo(
    () => sentenceCategoriesKeys.list(JSON.stringify(filters)),
    [filters],
  );

  const result = useQuery<SentenceCategory[]>(
    key,
    () => listSentenceCategory(session),
    queryOptions,
  );

  return { ...result, key };
};

type ShowSentenceCategoryFilters = {
  id: any;
};

export const showSentenceCategory = (
  session: Session | null,
  filters: ShowSentenceCategoryFilters,
) => {
  const api = initializeApi(session);
  const { id } = filters;

  return api
    .get<SentenceCategory>(`/sentence-category/${id}`)
    .then((response) => response.data);
};

export const useShowSentenceCategory = (
  session: Session | null,
  filters: ShowSentenceCategoryFilters,
  queryOptions: QueryObserverOptions<SentenceCategory> = {},
) => {
  const key = useMemo(
    () => sentenceCategoriesKeys.show(JSON.stringify(filters)),
    [filters],
  );

  const result = useQuery<SentenceCategory>(
    key,
    () => showSentenceCategory(session, filters),
    queryOptions,
  );
  return { ...result, key };
};
