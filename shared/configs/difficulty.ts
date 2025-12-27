export const PROBLEMS_DIFFICULTY = [
  '暂无评定',
  '入门',
  '普及-',
  '普及/提高-',
  '普及+/提高',
  '提高+/省选-',
  '省选/NOI-',
  'NOI/NOI+',
  'NOI+/CSTC',
  'NOI+/CSTC',
  'NOI+/CSTC',
] as const;

export const PROBLEMS_DIFFICULTY_SHORT = [
  '无',
  '入门',
  '普及-',
  '提高-',
  '提高',
  '省选-',
  '省选',
  'NOI',
  'NOI+',
  'NOI+',
  'NOI+',
] as const;

const rgb = (r: number, g: number, b: number) => {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export const PROBLEMS_DIFFICULTY_COLOR = {
  0: rgb(191, 191, 191),
  1: rgb(254, 76, 97),
  2: rgb(243, 156, 17),
  3: rgb(255, 193, 22),
  4: rgb(82, 196, 26),
  5: rgb(52, 152, 219),
  6: rgb(157, 61, 207),
  7: rgb(14, 29, 105),
  8: rgb(14, 29, 105),
  9: rgb(14, 29, 105),
  10: rgb(14, 29, 105),
};
