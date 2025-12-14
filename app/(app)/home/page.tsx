import Homepage from '@/features/homepage/homepage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '首页',
};

export default function Page() {
  return <Homepage />;
}