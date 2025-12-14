import { DomainDoc } from '@/shared/types/domain';
import { BaseUserDict } from '@/shared/types/user';
import { alova } from '@/api/server';
import { Blog } from '@/shared/types/blog';

export type BannerConfig = {
  max_width?: string;
  pictures: {
    src: string; // 图片 URL
    link: string; // 点击图片跳转的链接
  }[];
};
export type Banner = ['banner', BannerConfig];

export type Bulletin = ['bulletin', boolean];
export type Contest = ['contest', number];
export type Hitokoto = ['hitokoto', boolean];
export type Discussion = ['discussion', number];
export type StarredProblems = ['starred_problems', number];
export type RecentBlogs = ['recent_blogs', Blog[]];
export type DiscussionNodes = ['discussion_nodes', boolean];
export type Suggestion = ['suggestion', boolean];

export type CountdownEvent = {
  name: string;
  date: string;
  duration: number;
};
export type CountdownConfig = {
  events: CountdownEvent | CountdownEvent[];
  startDate: string;
};
export type Countdown = ['countdown', CountdownConfig];

export type SectionType =
  | Banner
  | Bulletin
  | Contest
  | Hitokoto
  | Discussion
  | StarredProblems
  | RecentBlogs
  | DiscussionNodes
  | Suggestion
  | Countdown;

export type Content = {
  width: number;
  sections: [string, SectionType][];
};

export type HomepageResponse = {
  bulletin: string;
  contents: Content[];
  udict: BaseUserDict;
  domain: DomainDoc;
};

export const getHomepage = () => alova.Get<HomepageResponse>('/');
