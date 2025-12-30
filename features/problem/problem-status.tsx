import { Badge } from '@/shared/components/ui/badge';
import {
  STATUS,
  STATUS_TEXTS,
  STATUS_BACKGROUND_COLOR,
} from '@/shared/configs/status';
import { ProblemStatus as ProblemStatusDoc } from '@/shared/types/problem';
import {
  CheckmarkCircle01Icon,
  CancelCircleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

type Props = {
  status: ProblemStatusDoc;
};

export default function ProblemStatus({ status }: Props) {
  if (!status.status) return <></>;

  const statusCode = status.status;
  const statusText = STATUS_TEXTS[statusCode as keyof typeof STATUS_TEXTS];
  const bgColor =
    STATUS_BACKGROUND_COLOR[statusCode as keyof typeof STATUS_BACKGROUND_COLOR];
  const isAccepted = statusCode === STATUS.STATUS_ACCEPTED;

  if (!statusText) return <></>;

  return (
    <Badge
      style={{
        backgroundColor: bgColor || '#6b7280',
      }}
    >
      <HugeiconsIcon
        icon={isAccepted ? CheckmarkCircle01Icon : CancelCircleIcon}
        size={16}
        strokeWidth={3}
      />
      <span className="hidden md:inline-block">{statusText}</span>
    </Badge>
  );
}

