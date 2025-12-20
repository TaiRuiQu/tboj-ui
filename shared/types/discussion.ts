export type Discussion = {
  _id: string;
  docId: string;

  docType: 21;
  domainId: string;
  owner: number;

  /** 父级类型 (例如: 10 代表题目, 30 代表比赛) */
  parentType: number;
  /** 父级 ID (关联的题目、比赛等的 ID) */
  parentId: string | number;

  title: string;
  content: string;
  ip?: string;
  pin: boolean;
  highlight: boolean;
  updateAt: Date;
  nReply: number;
  views: number;
  react: Record<string, number>;
  lock?: boolean;
  hidden?: boolean;
};
