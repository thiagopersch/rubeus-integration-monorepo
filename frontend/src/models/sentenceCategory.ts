export type SentenceCategory = {
  id: string;
  name: string;
  description: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type FormattedSentenceCategory = SentenceCategory & {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};

export type SentenceCategoryForm = {
  id?: string;
  name?: string;
  description?: string;
  status?: boolean;
};
