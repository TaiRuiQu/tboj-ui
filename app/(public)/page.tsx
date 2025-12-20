import { getNavInfos } from '@/api/server/method/ui/nav';
import { Button } from '@/shared/components/ui/button';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '首页',
};

export default async function IndexPage() {
  const { user } = await getNavInfos();
  if (user._id > 0) {
    redirect('/home');
  }

  return (
    <div
      className="container mx-auto flex h-screen items-center justify-center"
      id="landing-container"
    >
      <div className="space-y-2">
        <Image
          src="/nav-logo-small_light.png"
          alt="ZYZOJ Logo"
          width={160}
          height={44}
          priority
          className="mb-4"
        />
        <h1 className="text-3xl text-neutral-700">
          <span>
            <span className="text-emerald-500">现代</span>、
            <span className="text-sky-700">原生智能</span>的在线测评系统
          </span>
        </h1>
        <p className="text-neutral-500">
          准备好在 <span>ZYZOJ</span> 上体验深度集成的人工智能所带来的高效学习。
        </p>

        <Button asChild>
          <Link href="/login">登录</Link>
        </Button>
      </div>
    </div>
  );
}
