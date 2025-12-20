import Banner from './components/banner';
import RecentBlogs from './components/blogs';
import Contests from './components/contests';
import Countdown from './components/countdown';
import ServerApis from '@/api/server/method';
import type { SectionType } from '@/api/server/method/ui/homepage';
import TwoColumnLayout from '@/shared/layout/two-column';
import type { BaseUserDict } from '@/shared/types/user';

type SectionMap = {
  [K in SectionType[0]]?: Extract<SectionType, [K, unknown]>[1];
};

type ColumnProps = {
  contents: SectionMap;
  udict: BaseUserDict;

  bulletin?: string;
};

async function LeftColumn({ contents }: ColumnProps) {
  return (
    <div className="space-y-6">
      {contents.banner && <Banner banner={contents.banner} />}
      {contents.contest && <Contests contests={contents.contest[0]} />}
    </div>
  );
}

async function RightColumn({ contents, udict }: ColumnProps) {
  return (
    <div className="space-y-6">
      {contents.countdown && <Countdown config={contents.countdown} />}
      {contents.recent_blogs && (
        <RecentBlogs blogs={contents.recent_blogs} udict={udict} />
      )}
    </div>
  );
}

export default async function Homepage() {
  const homepage = await ServerApis.UI.getHomepage();

  const contents = homepage.contents
    .flatMap((content) => content.sections)
    .reduce<SectionMap>((acc, [key, section]) => {
      return {
        ...acc,
        [key]: section,
      };
    }, {});
  const udict = homepage.udict;

  return (
    <TwoColumnLayout
      left={<LeftColumn contents={contents} udict={udict} />}
      right={<RightColumn contents={contents} udict={udict} />}
    />
  );
}
