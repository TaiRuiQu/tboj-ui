import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import UserSpan from '@/shared/components/user/user-span';
import { cn } from '@/shared/lib/utils';
import type { Discussion } from '@/shared/types/discussion';
import type { BaseUserDict } from '@/shared/types/user';
import {
  Calendar01Icon,
  Chat01Icon,
  Comment01Icon,
  EyeIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';

type Props = {
  discussions: Discussion[];
  udict: BaseUserDict;
};

function MetaItem({
  icon,
  children,
}: {
  icon: IconSvgElement;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <HugeiconsIcon icon={icon} className="size-3.5" />
      <span className="tabular-nums">{children}</span>
    </span>
  );
}

function DiscussionRow({
  discussion,
  udict,
}: {
  discussion: Discussion;
  udict: BaseUserDict;
}) {
  const user = udict[discussion.owner]!;
  const updatedAt = dayjs(discussion.updateAt).isValid()
    ? dayjs(discussion.updateAt).format('YYYY-MM-DD')
    : '';

  return (
    <div className="space-y-1.5">
      <p className="text-foreground overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
        {discussion.title}
      </p>
      <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <UserSpan user={user} showAvatar />
        <MetaItem icon={Comment01Icon}>{discussion.nReply}</MetaItem>
        <MetaItem icon={EyeIcon}>{discussion.views}</MetaItem>
        {updatedAt && <MetaItem icon={Calendar01Icon}>{updatedAt}</MetaItem>}
      </div>
    </div>
  );
}

export default function Discussions({ discussions, udict }: Props) {
  if (!discussions.length) return null;

  const lastIndexByColumn: Record<number, number> = { 0: -1, 1: -1 };
  discussions.forEach((_, index) => {
    lastIndexByColumn[index % 2] = index;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <HugeiconsIcon icon={Chat01Icon} className="size-5" />
          最近讨论
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {discussions.map((discussion, index) => {
            const isLastOverall = index === discussions.length - 1;
            const isLastInColumn = index === lastIndexByColumn[index % 2];

            return (
              <div
                key={discussion.docId}
                className={cn(
                  !isLastOverall && 'border-b pb-4',
                  'sm:border-b-0 sm:pb-0',
                  !isLastInColumn && 'sm:border-b sm:pb-4'
                )}
              >
                <DiscussionRow discussion={discussion} udict={udict} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
