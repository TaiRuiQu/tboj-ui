import getUsernameColor from '@/features/user/lib/username-color';
import UserAvatar from '@/features/user/user-avatar';
import { BaseUser } from '@/shared/types/user';

type Props = {
  user: BaseUser;
  showAvatar?: boolean;
};

export default function UserSpan({ user, showAvatar = true }: Props) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-gray-500">
      {showAvatar && <UserAvatar user={user} size="sm" />}
      <span
        className="text-foreground font-medium"
        style={{ color: getUsernameColor(user) }}
      >
        {user.uname}
      </span>
    </span>
  );
}
