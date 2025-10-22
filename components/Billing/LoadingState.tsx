import React from 'react';

import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="h-main md:px-[20vw] mt-nav overflow-y-auto p-4 md:p-8">
      <div className="flex min-h-[400px] items-center justify-center flex-col gap-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        {message && <p className="text-muted-foreground text-sm">{message}</p>}
      </div>
    </div>
  );
};
