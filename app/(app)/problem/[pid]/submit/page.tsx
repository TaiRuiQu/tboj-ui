import { getProblemDetail } from '@/features/problem/detail/get-problem-detail';
import ProblemTitle from '@/features/problem/detail/problem-title';
import ProblemSidebar from '@/features/problem/sidebar';
import TwoColumnLayout from '@/shared/layout/two-column';
import { Metadata } from 'next';

type Params = {
  pid: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pid } = await params;
  const data = await getProblemDetail(pid);
  return {
    title: `${data.pdoc.title} - 提交`,
  };
}

export default async function ProblemSubmitPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pid } = await params;
  const data = await getProblemDetail(pid);

  return (
    <div className="space-y-6">
      <ProblemTitle problem={data.pdoc} />
      <TwoColumnLayout
        ratio="8-2"
        left={
          <div className="space-y-4" data-llm-visible="true">
            <div className="text-2xl font-semibold" data-llm-text="提交">
              提交
            </div>
            <div
              className="text-sm text-muted-foreground"
              data-llm-text="提交功能开发中"
            >
              提交功能开发中
            </div>
          </div>
        }
        right={
          <ProblemSidebar
            allowSubmit={false}
            showBackToProblem={true}
            discussionCount={data.discussionCount}
            solutionCount={data.solutionCount}
            problem={data.pdoc}
          />
        }
      />
    </div>
  );
}
