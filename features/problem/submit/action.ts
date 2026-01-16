'use server';

import ServerApis from '@/api/server/method';
import { ProblemSubmitRequest } from '@/api/server/method/problems/submit';

export async function submitSolution(
  pid: string,
  payload: ProblemSubmitRequest
) {
  try {
    const res = await ServerApis.Problems.submitProblem(pid, payload);
    return { success: true, data: res };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Submission failed';
    return { success: false, error: errorMessage };
  }
}
