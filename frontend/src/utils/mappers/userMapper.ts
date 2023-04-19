import moment from "moment";

import { Client } from "../../models/client";
import { Tbc } from "@/models/tbc";

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
