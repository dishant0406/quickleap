import React from 'react';

import { RULE_TABLE_MIN_WIDTH } from '@/lib/constants/rules';

export const RuleTableHeader: React.FC = () => {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 border-b-2 border-border mb-4 bg-bg text-sm font-medium text-secondaryBlack`}
      style={{ minWidth: RULE_TABLE_MIN_WIDTH }}
    >
      <div className="flex items-center mr-2 gap-3">
        <div className="w-5 h-5"></div> {/* Space for grip handle */}
        <div className="w-8 text-center">Priority</div>
      </div>
      <div className="flex-1 grid grid-cols-8 gap-4">
        <div>Name</div>
        <div className="text-center">Type</div>
        <div className="text-center">Status</div>
        <div className="col-span-2">Conditions</div>
        <div className="col-span-2">Destination</div>
        <div className="text-center">Hit Count</div>
      </div>
      <div className="w-8">Actions</div>
    </div>
  );
};
