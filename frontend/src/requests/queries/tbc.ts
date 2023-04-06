import { Session } from "next-auth";

import { Tbc } from "@/models/tbc";
import { initializeApi } from "@/services/api";

export const listTbc = (session?: Session | null) => {
  const api = initializeApi(session);

  return api.get<Tbc>("/tbc").then((response) => response.data);
};
