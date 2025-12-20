import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import UserSpan from '@/shared/components/user/user-span';
import { cn } from '@/shared/lib/utils';
import type { Blog } from '@/shared/types/blog';
import type { BaseUserDict } from '@/shared/types/user';
import {
  Calendar01Icon,
  Comment01Icon,
  EyeIcon,
  FavouriteIcon,
  Notebook01Icon,
  Tag01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import removeMd from 'remove-markdown';

type Props = {
  blogs: Blog[];
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

function BlogRow({ blog, udict }: { blog: Blog; udict: BaseUserDict }) {
  const user = udict[blog.owner]!;
  const excerpt = removeMd(blog.content, {
    stripListLeaders: true,
    listUnicodeChar: '',
    gfm: true,
    useImgAltText: true,
  })
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 100);
  const publishedAt = dayjs(blog.updateAt).isValid()
    ? dayjs(blog.updateAt).format('YYYY-MM-DD')
    : '';

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <p className="text-foreground overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
          {blog.title}
        </p>
        {excerpt && (
          <p className="text-muted-foreground overflow-hidden text-sm text-ellipsis whitespace-nowrap">
            {excerpt}
          </p>
        )}
      </div>

      <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <UserSpan user={user} showAvatar />
        {blog.category && <MetaItem icon={Tag01Icon}>{blog.category}</MetaItem>}
        <MetaItem icon={EyeIcon}>{blog.views}</MetaItem>
        <MetaItem icon={Comment01Icon}>{blog.nReply}</MetaItem>
        <MetaItem icon={FavouriteIcon}>{blog.likeCount}</MetaItem>
        {publishedAt && (
          <MetaItem icon={Calendar01Icon}>{publishedAt}</MetaItem>
        )}
      </div>
    </div>
  );
}

export default function RecentBlogs({ blogs, udict }: Props) {
  if (!blogs.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <HugeiconsIcon icon={Notebook01Icon} className="size-5" />
          最新博客
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <div
              key={blog.docId}
              className={cn(index !== blogs.length - 1 && 'border-b pb-4')}
            >
              <BlogRow blog={blog} udict={udict} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
