import { parseProblemContent } from '../parse-problem-content';
import Markdown from '@/shared/components/markdown';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { ContestDetailProjectionProblem } from '@/shared/types/problem';

const LANGUAGE_LABELS = {
  zh: '简体中文',
  zh_TW: '繁體中文',
  en: 'English',
  kr: '한국어',
  jp: '日本語',
} as const;

export default function ProblemContent({
  problem,
}: {
  problem: ContestDetailProjectionProblem;
}) {
  const contents = parseProblemContent(problem.content);
  if (contents.length === 1) {
    const text = contents[0]?.content ?? '';
    return <Markdown>{text}</Markdown>;
  }

  const hasZh = contents.some(({ language }) => language === 'zh');

  return (
    <Tabs defaultValue={hasZh ? 'zh' : contents[0].language}>
      <TabsList>
        {contents.map(({ language }) => (
          <TabsTrigger key={language} value={language}>
            {LANGUAGE_LABELS[language]}
          </TabsTrigger>
        ))}
      </TabsList>

      {contents.map(({ language, content }) => (
        <TabsContent key={language} value={language}>
          <Markdown>{content}</Markdown>
        </TabsContent>
      ))}
    </Tabs>
  );
}
