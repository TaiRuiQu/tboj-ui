import { type ProblemListResponse } from '@/api/server/method/problems/list';
import type { SearchParams } from '@/app/(app)/problem/(list)/page';
import ProblemDifficulty from '@/shared/components/problem/problem-difficulty';
import ProblemLink from '@/shared/components/problem/problem-link';
import ProblemStatus from '@/shared/components/problem/problem-status';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import Link from 'next/link';

type Props = {
  data: ProblemListResponse;
  showTags: boolean;
  searchParams: SearchParams;
};

export default function ProblemList({ data, showTags, searchParams }: Props) {
  const toggleShowTagsHref = `/problem?${new URLSearchParams({
    ...searchParams,
    showTags: String(!showTags),
  })}`;

  return (
    <Table className="table-fixed" data-llm-visible="true">
      <colgroup>
        <col className="w-12 md:w-32" />
        <col className="w-24" />
        <col />
        <col className="w-48" />
        <col className="w-28" />
        <col className="hidden w-24 md:table-column" />
      </colgroup>
      <TableHeader>
        <TableRow>
          <TableCell>状态</TableCell>
          <TableCell>题目 ID</TableCell>
          <TableCell>题目</TableCell>
          <TableCell className="text-right">
            <Button variant="link" className="h-auto p-0 text-sm font-medium">
              <Link href={toggleShowTagsHref}>
                {showTags ? '隐藏标签' : '展示标签'}
              </Link>
            </Button>
          </TableCell>
          <TableCell className="text-center">难度</TableCell>
          <TableCell className="hidden text-center md:table-cell">
            通过率
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.pdocs.map((problem) => (
          <TableRow key={problem.docId}>
            <TableCell>
              {data.psdict[problem.docId] && (
                <ProblemStatus status={data.psdict[problem.docId]} />
              )}
            </TableCell>
            <TableCell data-llm-text={String(problem.pid)}>{problem.pid}</TableCell>
            <TableCell>
              <ProblemLink problem={problem} />
            </TableCell>
            <TableCell className="text-right">
              {showTags && (
                <div className="flex flex-wrap gap-2 justify-end">
                  {problem.tag.map((tag) => (
                    <Badge variant="secondary" key={tag} data-llm-text={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </TableCell>
            <TableCell className="text-center">
              <ProblemDifficulty difficulty={problem.difficulty} />
            </TableCell>
            <TableCell className="hidden text-center md:table-cell">
              <Progress
                className="h-2!"
                value={(problem.nAccept * 100) / problem.nSubmit}
                data-llm-text={`${Math.round((problem.nAccept * 100) / problem.nSubmit)}%`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
