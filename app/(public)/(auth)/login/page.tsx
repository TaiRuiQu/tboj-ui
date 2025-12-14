import type { Metadata } from 'next';

import { LoginPage } from '@/features/auth/login/login-page';

export const metadata: Metadata = {
  title: '登录',
};

export default function LoginRoutePage() {
  return <LoginPage />;
}
