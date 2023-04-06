import { Session } from "next-auth";

import { Client } from "@/models/client";
import { initializeApi } from "@/services/api";

export const listClients = (session?: Session | null) => {
  const api = initializeApi(session);

  return api.get<Client[]>("/clients").then((response) => response.data);
};
