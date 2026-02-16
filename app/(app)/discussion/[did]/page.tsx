import { notFound } from 'next/navigation';

type Props = {
  params: { did: string };
};

export default function DiscussionPage({ params }: Props) {
  notFound();
}
