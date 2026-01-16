import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import type { ContestListProjectionProblem } from '@/shared/types/problem';
import {
  ArrowLeftIcon,
  Book03Icon,
  Chat01Icon,
  File01Icon,
  Navigation03Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import Link from 'next/link';

type Props = {
  allowSubmit?: boolean;
  showBackToProblem?: boolean;

  discussionCount?: number;
  solutionCount?: number;

  problem: ContestListProjectionProblem;
};

type SidebarButtonProps = {
  icon: IconSvgElement;
  text: string;
  href: string;
  count?: number;
};

function SidebarButton({ icon, text, href, count }: SidebarButtonProps) {
  return (
    <Button
      asChild
      className="h-10 w-full justify-start gap-3 rounded-none px-4"
      variant="ghost"
    >
      <Link href={href}>
        <HugeiconsIcon icon={icon} strokeWidth={2} />
        <span data-llm-text={text}>{text}</span>
        {count !== undefined && (
          <Badge variant="secondary" className="ml-auto">
            {count}
          </Badge>
        )}
      </Link>
    </Button>
  );
}

export default function ProblemSidebar({
  allowSubmit,
  showBackToProblem,
  discussionCount,
  solutionCount,
  problem,
}: Props) {
  return (
    <div className="w-full">
      <div className="border-l">
        {allowSubmit && (
          <Button
            asChild
            className="h-10 w-full justify-start gap-3 rounded-none px-4"
          >
            <Link href={`/problem/${problem.pid ?? problem.docId}/submit`}>
              <HugeiconsIcon icon={Navigation03Icon} strokeWidth={2} />
              <span data-llm-text="提交">提交</span>
            </Link>
          </Button>
        )}
        {showBackToProblem && (
          <Button
            asChild
            className="h-10 w-full justify-start gap-3 rounded-none px-4"
          >
            <Link href={`/problem/${problem.pid ?? problem.docId}`}>
              <HugeiconsIcon icon={ArrowLeftIcon} strokeWidth={2} />
              <span data-llm-text="返回题目">返回题目</span>
            </Link>
          </Button>
        )}
        <SidebarButton
          icon={Chat01Icon}
          text="讨论"
          href="#"
          count={discussionCount}
        />
        <SidebarButton
          icon={Book03Icon}
          text="题解"
          href={`/problem/${problem.pid ?? problem.docId}/solution`}
          count={solutionCount}
        />
        <SidebarButton
          icon={File01Icon}
          text="文件"
          href={`/problem/${problem.pid ?? problem.docId}/files`}
        />
      </div>
    </div>
  );
}
