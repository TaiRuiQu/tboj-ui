import { Badge } from '@/shared/components/ui/badge';
import {
  PROBLEMS_DIFFICULTY,
  PROBLEMS_DIFFICULTY_COLOR,
} from '@/shared/configs/difficulty';

export type Props = {
  difficulty?: number;
};

export default function ProblemDifficulty({ difficulty }: Props) {
  if (!difficulty || typeof difficulty !== 'number') difficulty = 0;
  if (difficulty < 0 || difficulty > 7) difficulty = 0;
  const bgColor = PROBLEMS_DIFFICULTY_COLOR[difficulty];
  const label = PROBLEMS_DIFFICULTY[difficulty] ?? '暂无评定';

  return (
    <Badge style={{ backgroundColor: bgColor }}>
      <span className="text-white" data-llm-text={label}>
        {label}
      </span>
    </Badge>
  );
}
