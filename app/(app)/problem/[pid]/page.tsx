import { getProblemDetail } from '@/features/problem/detail/get-problem-detail';
import ProblemContent from '@/features/problem/detail/problem-content';
import ProblemTitle from '@/features/problem/detail/problem-title';
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
    title: data.pdoc.title || '题目详情',
  };
}

export default async function ProblemDetailPage({
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
        left={<ProblemContent problem={data.pdoc} />}
        right={<></>}
      />
    </div>
  );
}
