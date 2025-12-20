import { LoginPage } from '@/features/auth/login/login-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录',
};

export default function LoginRoutePage() {
  return <LoginPage />;
}
