import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import type { CountdownConfig, CountdownEvent } from '@/api/server/method/ui/homepage';
import { HugeiconsIcon } from '@hugeicons/react';
import { Clock01Icon } from '@hugeicons/core-free-icons';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(duration);
dayjs.extend(customParseFormat);

function EventCountdown({ event }: { event: CountdownEvent }) {
  const now = dayjs();
  const start = dayjs(event.date);
  const end = start.add(event.duration, 'second');

  let status: 'pending' | 'running' | 'ended' = 'pending';
  let timeText = '';

  if (now.isBefore(start)) {
    status = 'pending';
    const months = start.diff(now, 'month');
    const days = start.diff(now.add(months, 'month'), 'day');
    timeText = `${months > 0 ? months + ' 月 ' : ''}${days} 天`;
  } else if (now.isBefore(end)) {
    status = 'running';
    const months = end.diff(now, 'month');
    const days = end.diff(now.add(months, 'month'), 'day');
    timeText = `${months > 0 ? months + ' 月 ' : ''}${days} 天`;
  } else {
    status = 'ended';
  }

  if (status === 'ended') return null;

  return (
    <div className="text-center">
      <span className="text-muted-foreground text-sm">距离 </span>
      <span className="font-medium text-foreground mx-1 text-sm">{event.name}</span>
      <span className="text-muted-foreground text-sm">{status === 'pending' ? '开始' : '结束'}还剩 </span>
      <span className={`text-sm font-bold ml-1 ${status === 'running' ? 'text-red-500' : 'text-primary'}`}>
        {timeText}
      </span>
    </div>
  );
}

export default function Countdown({ config }: { config: CountdownConfig }) {
  const events = (Array.isArray(config.events) ? config.events : [config.events])
    .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

  if (!events.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <HugeiconsIcon icon={Clock01Icon} className="size-5" />
          倒计时
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {events.map((event, index) => (
            <EventCountdown key={index} event={event} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
