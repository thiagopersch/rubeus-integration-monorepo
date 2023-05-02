export type Sentence = {
  id: string;
  tbc_id: string;
  sentence_category_id: string;
  code: string;
  name: string;
  coligate: string;
  system_code: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type FormattedSentence = Sentence & {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};

export type SentenceForm = {
  id?: string;
  tbc_id: string;
  sentence_category_id: string;
  code: string;
  name: string;
  coligate: string;
  system_code: string;
  content: string;
};

export type BasicSentenceFormType = {
  tbc_id: string;
  sentence_category_id: string;
  code: string;
  name: string;
  coligate: string;
  system_code: string;
  content: string;
  created_at: string;
  updated_at: string;
};
