export type SupportedProblemLanguage = 'zh' | 'zh_TW' | 'kr' | 'en' | 'jp';

export type ProblemContentInLanguage = {
  language: SupportedProblemLanguage;
  content: string;
};
export type ProblemContent = ProblemContentInLanguage[];

export function parseProblemContent(content: string): ProblemContent {
  const languages = ['zh', 'zh_TW', 'kr', 'en', 'jp'] as const;
  const raw = content.trim();
  if (!raw) return [];

  try {
    const record = JSON.parse(raw) as Partial<
      Record<SupportedProblemLanguage, string>
    >;
    return languages.flatMap((language) => {
      const text = record[language]?.trim();
      if (!text) return [];
      return [{ language, content: text }];
    });
  } catch {
    return [{ language: 'zh', content: raw }];
  }
}
