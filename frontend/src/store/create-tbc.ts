import { atomWithReset } from "jotai/utils";

import { BasicTbcFormType } from "@/models/tbc";

export const basicTbcData = atomWithReset<BasicTbcFormType>(
  {} as BasicTbcFormType,
);
