import type { Language } from "../language.ts";
import { en } from "./en.ts";
import { id } from "./id.ts";
import type { PageCopy } from "./types.ts";

export type {
  Decision,
  Entry,
  Fact,
  Layer,
  PageCopy,
  SkillGroup,
  WorkCardCopy,
} from "./types.ts";

export const pageCopy: Record<Language, PageCopy> = { en, id };

export const CONTACT = {
  email: "istihsanbismo.putro@gmail.com",
  linkedInUrl: "https://linkedin.com/in/istihsan",
  linkedInDisplay: "linkedin.com/in/istihsan",
} as const;
