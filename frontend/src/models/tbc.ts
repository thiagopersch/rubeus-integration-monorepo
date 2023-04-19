import { Client } from "./client";

export type Tbc = {
  id: string;
  client_id: string;
  client?: Client;
  name: string;
  user: string;
  password: string;
  link: string;
  unlicensed_method: string;
  context_coligate_code: string;
  context_branch_code: string;
  context_education_level_code: string;
  context_system_code: string;
  context_user_code: string;
  created_at: string;
  updated_at: string;
};

export type FormattedTbc = Tbc & {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};

export type TbcForm = {
  id: string;
  client_id?: string;
  name?: string;
  user?: string;
  password?: string;
  link?: string;
  unlicensed_method?: string;
  context_coligate_code?: string;
  context_branch_code?: string;
  context_education_level_code?: string;
  context_system_code?: string;
  context_user_code?: string;
};

export type BasicTbcFormType = {
  client_id: string;
  name: string;
  user: string;
  password: string;
  link: string;
  unlicensed_method: string;
  context_coligate_code: string;
  context_branch_code: string;
  context_education_level_code: string;
  context_system_code: string;
  context_user_code: string;
};
