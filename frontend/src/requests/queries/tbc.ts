import { Session } from "next-auth";

import { FormattedTbc, Tbc } from "@/models/tbc";
import { initializeApi } from "@/services/api";
import { tbcMapper } from "@/utils/mappers/userMapper";
import { QueryObserverOptions, useQuery } from "react-query";
import { useMemo } from "react";

type ListTBCFilters = {
  client_id?: string;
  name?: string;
  user?: string;
  password?: string;
  link?: string;
  unlicensed_method?: boolean;
  context_coligate_code?: string;
  context_branch_code?: string;
  context_education_level_code?: string;
  context_system_code?: string;
  context_user_code?: string;
};

export const tbcKeys = {
  all: "classrooms" as const,
  shows: () => [...tbcKeys.all, "show"] as const,
  show: (filters: string) => [...tbcKeys.shows(), { filters }] as const,
};

export const listTbc = (
  session?: Session | null,
  filters: ListTBCFilters = {},
): Promise<FormattedTbc[]> => {
  const api = initializeApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  return api
    .get<Tbc[]>("/tbc", { params })
    .then((response) => response.data.map(tbcMapper));
};

export const useListTbc = (
  session?: Session | null,
  filters: ListTBCFilters = {},
  queryOptions: QueryObserverOptions<Tbc[]> = {},
) => {
  const key = `get-tbc-${JSON.stringify(filters)}`;

  const result = useQuery<Tbc[]>(key, () => listTbc(session), queryOptions);

  return { ...result, key };
};

type ShowClassroomFilters = {
  id: string;
};

export const showTbc = (
  session: Session | null,
  filters: ShowClassroomFilters,
) => {
  const api = initializeApi(session);
  const { id } = filters;

  return api.get<Tbc>(`/tbc/${id}`).then((response) => response.data);
};

export const useShowTbc = (
  session: Session | null,
  filters: ShowClassroomFilters,
  queryOptions: QueryObserverOptions<Tbc> = {},
) => {
  const key = useMemo(() => tbcKeys.show(JSON.stringify(filters)), [filters]);

  const result = useQuery<Tbc>(
    key,
    () => showTbc(session, filters),
    queryOptions,
  );
  return { ...result, key };
};
