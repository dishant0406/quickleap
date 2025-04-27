import React, { useEffect, useMemo, useRef } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import SVGMap from './Map'; // Import the SVGMap component

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
  // Generate a unique ID for this map instance to prevent conflicts
  const uniqueMapId = useRef(`world-map-${Math.random().toString(36).substring(2, 9)}`).current;

  // Track if the map has been initialized
  const mapInitialized = useRef(false);

  // Convert the MapDataPoint array to the format expected by SVGMap
  const svgMapData = useMemo(() => {
    const values: Record<string, { count: number; percentage: number }> = {};

    // Populate values with country codes as keys
    data.forEach((item) => {
      values[item.location] = {
        count: item.count,
        percentage: item.percentage,
      };
    });

    return {
      data: {
        count: {
          name: 'Count',
          format: '{0}',
          thousandSeparator: ',',
          thresholdMax: Math.max(...data.map((item) => item.count || 0), 1) * 1.1,
          thresholdMin: 0,
        },
        percentage: {
          name: 'Percentage',
          format: '{0}%',
          thousandSeparator: '.',
        },
      },
      applyData: 'count', // Use count for coloring
      values: values,
    };
  }, [data]);

  // Clean up any existing map elements before re-rendering
  useEffect(() => {
    return () => {
      // Cleanup function
      mapInitialized.current = false;

      // Clean up any existing SVG elements
      if (typeof document !== 'undefined') {
        const existingMapElement = document.getElementById(uniqueMapId);
        if (existingMapElement) {
          // Just ensure we're not leaving any child elements when this component unmounts
          existingMapElement.innerHTML = '';
        }
      }
    };
  }, [uniqueMapId]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center bg-muted/10 rounded-md relative">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <span>Loading map data...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <span>No data available</span>
            </div>
          ) : (
            <SVGMap
              colorMax="#ffdc58" // Blue color for maximum values
              colorMin="#ffeeac" // Light blue for minimum values
              colorNoData="#f3f4f6" // Light gray for no data
              data={svgMapData}
              initialZoom={1.1}
              targetId={uniqueMapId}
              width="100%"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldMap;
