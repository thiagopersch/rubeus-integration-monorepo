import format from "date-fns/format";

import { Client } from "../../models/client";

import { parseDateWithoutTimezone } from "../../utils/parseDateWithoutTimezone";

export const clientMapper = (client: Client) => ({
  ...client,
  formattedCreatedAt: format(
    parseDateWithoutTimezone(client.created_at),
    "dd/MM/yyyy 'às' HH:mm",
  ),
  formattedUpdatedAt: format(
    parseDateWithoutTimezone(client.updated_at),
    "dd/MM/yyyy 'às' HH:mm",
  ),
});
