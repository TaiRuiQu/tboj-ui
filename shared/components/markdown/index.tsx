import './markdown.css';
import ProblemSample from './problem-sample';
import remarkProblemSamples from '@/shared/components/markdown/plugins/remark-problem-samples';
import 'katex/dist/katex.min.css';
import MarkdownRenderer from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown">
      <MarkdownRenderer
        remarkPlugins={[remarkGfm, remarkMath, remarkProblemSamples]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // @ts-expect-error samples is a custom element
          samples: ProblemSample,
        }}
      >
        {children}
      </MarkdownRenderer>
    </div>
  );
}
