import ServerApis from '@/api/server/method';

export default async function ProblemListPage({}) {
  const data = await ServerApis.Problems.getProblemsList();
}
