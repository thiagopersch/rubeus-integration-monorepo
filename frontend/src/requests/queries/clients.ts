import { Session } from "next-auth";

import { Client, FormattedClient } from "@/models/client";
import { initializeApi } from "@/services/api";
import { clientMapper } from "@/utils/mappers/userMapper";
import { QueryObserverOptions, useQuery } from "react-query";

type ListClientFilters = {
  name?: string;
  status?: string;
};

export const listClients = (
  session?: Session | null,
  filters: ListClientFilters = {},
): Promise<FormattedClient[]> => {
  const api = initializeApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  return api
    .get<Client[]>("/clients", { params })
    .then((response) => response.data.map(clientMapper));
};

// export const useListClients = (session?: Session | null) => {
//   return useQuery("get-clients", () => listClients(session));
// };

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

export const showClient = (session: Session | null, id: string) => {
  const api = initializeApi(session);

  return api.get<Client>(`/clients/${id}`).then((response) => response.data);
};

export const useShowClient = (session: Session | null, id: string) => {
  const key = `show-client-${id}`;

  const result = useQuery(key, () => showClient(session, id));
  return { ...result, key };
};
