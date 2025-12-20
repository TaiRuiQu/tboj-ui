import React from 'react';

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  gap?: string; // Tailwind gap class, e.g., 'gap-4', 'gap-x-8'
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  left,
  right,
  gap = 'gap-8',
}) => {
  return (
    <div className={`grid grid-cols-10 ${gap} p-4`}>
      <div className="col-span-7">{left}</div>
      <div className="col-span-3">{right}</div>
    </div>
  );
};

export default TwoColumnLayout;
