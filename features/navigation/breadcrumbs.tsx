'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';

const BREADCRUMB_NAME_MAP: Record<string, string> = {
  home: '首页',
  p: '题目',
  training: '训练',
  contest: '比赛',
  homework: '作业',
  discussion: '讨论',
  record: '评测记录',
  ranking: '排名',
  domain: '管理域',
  manage: '系统设置',
  course: '视频课程',
  live: '直播课堂',
};

const NON_BREADCRUMB_SEGMENTS = ['home'];

export function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();

  if (NON_BREADCRUMB_SEGMENTS.includes(segments[0])) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-base">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/home">ZYZOJ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {segments.map((segment, index) => {
          // Skip 'home' if it is the first segment to avoid duplication
          if (segment === 'home' && index === 0) return null;

          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const displayName = BREADCRUMB_NAME_MAP[segment] || segment;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
