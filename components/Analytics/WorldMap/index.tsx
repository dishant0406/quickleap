import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MapDataPoint {
  location: string;
  count: number;
  percentage: number;
}

interface WorldMapProps {
  data: MapDataPoint[];
  title: string;
  className?: string;
  isLoading?: boolean;
}

const WorldMap: React.FC<WorldMapProps> = ({ data, title, className, isLoading = false }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md relative">
          {isLoading ? (
            <div className="h-full w-full bg-muted/20 rounded-md animate-pulse" />
          ) : (
            <>
              <div className="text-sm text-muted-foreground">
                World map visualization - requires map integration
              </div>
              <div className="absolute inset-0 pointer-events-none">
                {data.slice(0, 3).map((country, index) => (
                  <div
                    key={country.location}
                    className="absolute p-2 bg-analytics-purple/80 text-white text-xs rounded-md shadow-md"
                    style={{
                      top: `${20 + index * 15}%`,
                      left: `${30 + index * 10}%`,
                      opacity: 0.8 + (0.2 * (3 - index)) / 3,
                    }}
                  >
                    {country.location}: {country.count} ({country.percentage}%)
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldMap;
