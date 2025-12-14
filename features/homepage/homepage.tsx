import ServerApis from '@/api/server/method';
import type { SectionType } from '@/api/server/method/ui/homepage';
import TwoColumnLayout from '@/shared/layout/two-column';
import Banner from './components/banner';
import Countdown from './components/countdown';
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
    </div>
  );
}

async function RightColumn({ contents }: ColumnProps) {
  return (
    <div className="space-y-6">
      {contents.countdown && <Countdown config={contents.countdown} />}
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