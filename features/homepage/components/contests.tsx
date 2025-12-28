import { Badge } from '@/shared/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';
import { RuleTexts, type Contest } from '@/shared/types/contest';
import {
  Award01Icon,
  Calendar01Icon,
  ChampionIcon,
  StarIcon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';

type Props = {
  contests: Contest[];
};

type ContestStatus = 'running' | 'pending' | 'ended';

function getContestStatus(contest: Contest, now: dayjs.Dayjs): ContestStatus {
  const beginAt = dayjs(contest.beginAt);
  const endAt = dayjs(contest.endAt);

  if (beginAt.isValid() && endAt.isValid()) {
    if (now.isBefore(beginAt)) return 'pending';
    if (now.isBefore(endAt)) return 'running';
    return 'ended';
  }

  return 'ended';
}

function getStatusStyle(status: ContestStatus) {
  switch (status) {
    case 'running':
      return { className: 'text-pink-600', label: '进行中' as const };
    case 'pending':
      return { className: 'text-blue-500', label: '即将开始' as const };
    default:
      return { className: 'text-muted-foreground', label: '已结束' as const };
  }
}

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

function ContestRow({ contest }: { contest: Contest }) {
  const now = dayjs();
  const status = getContestStatus(contest, now);
  const statusStyle = getStatusStyle(status);

  const beginAt = dayjs(contest.beginAt);
  const endAt = dayjs(contest.endAt);
  const timeText =
    beginAt.isValid() && endAt.isValid()
      ? `${beginAt.format('MM-DD HH:mm')} ~ ${endAt.format(
          beginAt.year() === endAt.year() ? 'MM-DD HH:mm' : 'YYYY-MM-DD HH:mm'
        )}`
      : '';

  return (
    <div data-llm-visible="true" className="space-y-1.5">
      <div className="flex items-start justify-between gap-2">
        <p
          data-llm-text={contest.title}
          className={cn(
            'overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap',
            statusStyle.className
          )}
        >
          {contest.title}
        </p>
        <span
          data-llm-text={statusStyle.label}
          className={cn('shrink-0 text-xs font-medium', statusStyle.className)}
        >
          {statusStyle.label}
        </span>
      </div>

      <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        {timeText && (
          <MetaItem icon={Calendar01Icon}>
            <span data-llm-text={timeText}>{timeText}</span>
          </MetaItem>
        )}
        <Badge variant="outline">
          <HugeiconsIcon icon={ChampionIcon} />
          <span data-llm-text={RuleTexts[contest.rule]}>
            {RuleTexts[contest.rule]}
          </span>
        </Badge>
        <Badge variant="secondary" title="参赛人数">
          <HugeiconsIcon icon={UserGroupIcon} data-icon="inline-start" />
          <span data-llm-text={String(contest.attend)} className="tabular-nums">
            {contest.attend}
          </span>
        </Badge>
        {contest.rated && (
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"
            title="Rated"
          >
            <HugeiconsIcon icon={StarIcon} data-icon="inline-start" />
            <span data-llm-text="Rated">Rated</span>
          </Badge>
        )}
      </div>
    </div>
  );
}

export default function Contests({ contests }: Props) {
  if (!contests.length) return null;

  const lastIndexByColumn: Record<number, number> = { 0: -1, 1: -1 };
  contests.forEach((_, index) => {
    lastIndexByColumn[index % 2] = index;
  });

  return (
    <Card data-llm-visible="true">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <HugeiconsIcon icon={Award01Icon} className="size-5" />
          <span data-llm-text="最近比赛">最近比赛</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {contests.map((contest, index) => {
            const isLastOverall = index === contests.length - 1;
            const isLastInColumn = index === lastIndexByColumn[index % 2];

            return (
              <div
                key={contest.docId}
                className={cn(
                  !isLastOverall && 'border-b pb-4',
                  'sm:border-b-0 sm:pb-0',
                  !isLastInColumn && 'sm:border-b sm:pb-4'
                )}
              >
                <ContestRow contest={contest} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
