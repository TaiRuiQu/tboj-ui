import { alova } from '@/api/server';
import { ObjectId } from '@/shared/types/shared';

export type ProblemSubmitRequest = {
  lang: string;
  code?: string;
  pretest?: boolean;
  input?: string[];
  tid?: ObjectId;
};

export type ProblemSubmitResponse = {
  rid?: ObjectId;
  tid?: ObjectId;
};

export type SubmitLanguage = {
  name: string;
  display: string;
};

export type LanguageFamily = SubmitLanguage[];

export type AvailableLanguagesResponse = {
  languages: Record<string, LanguageFamily>;
};

export const submitProblem = (pid: string, payload: ProblemSubmitRequest) =>
  alova.Post<ProblemSubmitResponse>(`/p/${pid}/submit`, payload);

export const getAvailableLanguages = (pid: number) =>
  alova.Get<AvailableLanguagesResponse>(`/ui/languages`, {
    params: { pid },
  });
