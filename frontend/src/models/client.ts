export type Client = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type FormattedClient = Client & {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};
