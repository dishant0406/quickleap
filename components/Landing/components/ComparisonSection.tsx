import React from 'react';

import { AlertTriangle, Check, X } from 'lucide-react';

import Logo from '@/components/Micro/Logo';

interface ComparisonData {
  feature: string;
  quickleap: 'yes' | 'no' | 'limited';
  traditionalHosting: 'yes' | 'no' | 'limited';
  otherRedirectServices: 'yes' | 'no' | 'limited';
}

const comparisonData: ComparisonData[] = [
  {
    feature: 'No Hosting Required',
    quickleap: 'yes',
    traditionalHosting: 'no',
    otherRedirectServices: 'no',
  },
  {
    feature: 'Instant Redirect Setup',
    quickleap: 'yes',
    traditionalHosting: 'no',
    otherRedirectServices: 'yes',
  },
  {
    feature: 'Advanced Redirect Rules',
    quickleap: 'yes',
    traditionalHosting: 'no',
    otherRedirectServices: 'limited',
  },
  {
    feature: 'Comprehensive Analytics',
    quickleap: 'yes',
    traditionalHosting: 'no',
    otherRedirectServices: 'limited',
  },
  {
    feature: 'Scalability',
    quickleap: 'yes',
    traditionalHosting: 'no',
    otherRedirectServices: 'yes',
  },
  {
    feature: 'API Integration',
    quickleap: 'yes',
    traditionalHosting: 'limited',
    otherRedirectServices: 'yes',
  },
];

const StatusIcon = ({ status }: { status: 'yes' | 'no' | 'limited' }) => {
  switch (status) {
    case 'yes':
      return <Check className="text-green-500 mx-auto" size={28} />;
    case 'no':
      return <X className="text-red-500 mx-auto" size={28} />;
    case 'limited':
      return <AlertTriangle className="text-amber-500 mx-auto" size={24} />;
    default:
      return null;
  }
};

const ComparisonSection: React.FC = () => {
  return (
    <div className="min-h-main flex flex-col px-[5vw] items-center  py-[10vh] ">
      <h2 className="text-[8vw] md:text-[3vw] text-center font-anton text-primaryBlack dark:text-white">
        Why choose <span className="text-main">QuickLeap</span> over traditional hosting?
      </h2>
      <h3 className="text-[4vw] md:w-[70vw] text-center  md:text-[1vw] mt-2 font-medium text-primaryBlack dark:text-white">
        See how we stack up against traditional hosting and other redirect services. QuickLeap
        offers a seamless and efficient solution for all your redirect needs, making it the best
        choice for your domain management.
      </h3>
      <div className="rounded-2xl mt-8 w-full  overflow-hidden border-4 border-primaryBlack shadow-shadow">
        {/* Header Row */}
        <div className="grid grid-cols-4 bg-cream-50 font-bold text-sm sm:text-base md:text-xl">
          <div className="p-3 sm:p-4 md:p-6 border-b-4 border-r-4 border-primaryBlack flex items-center justify-center">
            <h3 className="text-center">Features</h3>
          </div>
          <div className="p-3 sm:p-4 md:p-6 border-b-4 border-r-4 border-primaryBlack flex items-center justify-center">
            <Logo className="w-24 md:w-32 lg:w-40" />
          </div>
          <div className="p-3 sm:p-4 md:p-6 border-b-4 border-r-4 border-primaryBlack flex items-center justify-center">
            <h3 className="text-center">Traditional Hosting</h3>
          </div>
          <div className="p-3 sm:p-4 md:p-6 border-b-4 border-primaryBlack flex items-center justify-center">
            <h3 className="text-center">Other Redirect Services</h3>
          </div>
        </div>

        {/* Comparison Rows */}
        {comparisonData.map((row, index) => (
          <div key={index} className="grid grid-cols-4 bg-white">
            <div
              className={`p-3 sm:p-4 md:p-6 border-r-4 border-primaryBlack flex items-center ${
                index === comparisonData.length - 1 ? '' : 'border-b-4'
              }`}
            >
              <span className="font-medium text-sm px-2 truncate sm:text-base md:text-lg">
                {row.feature}
              </span>
            </div>
            <div
              className={`p-3 sm:p-4 md:p-6 border-r-4 border-primaryBlack flex items-center justify-center ${
                index === comparisonData.length - 1 ? '' : 'border-b-4'
              }`}
            >
              <StatusIcon status={row.quickleap} />
            </div>
            <div
              className={`p-3 sm:p-4 md:p-6 border-r-4 border-primaryBlack flex items-center justify-center ${
                index === comparisonData.length - 1 ? '' : 'border-b-4'
              }`}
            >
              {row.traditionalHosting === 'limited' ? (
                <div className="flex flex-col items-center">
                  <StatusIcon status={row.traditionalHosting} />
                  <span className="text-xs text-amber-700 mt-1">Complex Setup</span>
                </div>
              ) : (
                <StatusIcon status={row.traditionalHosting} />
              )}
            </div>
            <div
              className={`p-3 sm:p-4 md:p-6 border-primaryBlack flex items-center justify-center ${
                index === comparisonData.length - 1 ? '' : 'border-b-4'
              }`}
            >
              {row.otherRedirectServices === 'limited' ? (
                <div className="flex flex-col items-center">
                  <StatusIcon status={row.otherRedirectServices} />
                  <span className="text-xs text-center text-amber-700 mt-1">Limited Features</span>
                </div>
              ) : (
                <StatusIcon status={row.otherRedirectServices} />
              )}
            </div>
          </div>
        ))}

        {/* Bottom Row */}
      </div>
    </div>
  );
};

export default ComparisonSection;
