import moment from "moment";

import { Client } from "../../models/client";

export const clientMapper = (client: Client) => ({
  ...client,
  formattedCreatedAt: moment(client.created_at).format(
    "DD/MM/YYYY [às] HH:mm:ss",
  ),
  formattedUpdatedAt: moment(client.updated_at).format(
    "DD/MM/YYYY [às] HH:mm:ss",
  ),
});
