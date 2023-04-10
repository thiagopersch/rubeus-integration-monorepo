export type Client = {
  id: string;
  name: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type FormattedClient = Client & {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};

export type ClientForm = {
  id?: string;
  name?: string;
  status?: boolean;
};
