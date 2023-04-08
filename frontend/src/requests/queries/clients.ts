import { Session } from "next-auth";

import { Client } from "@/models/client";
import { initializeApi } from "@/services/api";
import { QueryObserverOptions, useQuery } from "react-query";

type ListClientFilters = {
  name?: string;
  status?: string;
};

export const listClients = (
  session?: Session | null,
  // filters: ListClientFilters = {},
) => {
  const api = initializeApi(session);

  return api.get<Client[]>("/clients").then((response) => response.data);
};

export const useListClients = (
  session?: Session | null,
  filters: ListClientFilters = {},
  queryOptions: QueryObserverOptions<Client[]> = {},
) => {
  const key = `get-clients-${JSON.stringify(filters)}`;

  const result = useQuery<Client[]>(
    key,
    () => listClients(session),
    queryOptions,
  );

  return { ...result, key };
};
