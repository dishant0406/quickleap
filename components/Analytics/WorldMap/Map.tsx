import React, { useEffect, useRef } from 'react';

type CountryValue = {
  [key: string]: number | string | undefined;
  link?: string;
  linkTarget?: string;
  color?: string;
};
type DataMetric = {
  name: string;
  format: string;
  thousandSeparator?: string;
  thresholdMax?: number;
  thresholdMin?: number;
};
type SVGMapData = {
  data: { [key: string]: DataMetric };
  applyData: string;
  values: { [countryCode: string]: CountryValue };
};
interface SVGMapProps {
  targetId?: string;
  data: SVGMapData;
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number;
  initialPan?: { x: number; y: number };
  zoomScaleSensitivity?: number;
  mouseWheelZoomEnabled?: boolean;
  mouseWheelZoomWithKey?: boolean;
  mouseWheelKeyMessage?: string;
  mouseWheelKeyMessageMac?: string;
  colorMax?: string;
  colorMin?: string;
  colorNoData?: string;
  flagType?: 'emoji' | 'image';
  flagURL?: string;
  hideFlag?: boolean;
  noDataText?: string;
  touchLink?: boolean;
  onGetTooltip?: (
    tooltipDiv: HTMLElement,
    countryID: string,
    countryValues: CountryValue
  ) => string | void;
  countries?: Record<string, boolean>;
  countryNames?: Record<string, string>;
  height?: string;
  width?: string;
  className?: string;
}

const SVGMap: React.FC<SVGMapProps> = ({
  targetId = 'svgMap',
  data,
  minZoom = 1,
  maxZoom = 25,
  initialZoom = 1.06,
  initialPan = { x: 0, y: 0 },
  zoomScaleSensitivity = 0.2,
  mouseWheelZoomEnabled = true,
  mouseWheelZoomWithKey = false,
  mouseWheelKeyMessage = 'Press the [ALT] key to zoom',
  mouseWheelKeyMessageMac = 'Press the [COMMAND] key to zoom',
  colorMax = '#CC0033',
  colorMin = '#FFE5D9',
  colorNoData = '#E2E2E2',
  flagType = 'image',
  flagURL = 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/{0}.svg',
  hideFlag = false,
  noDataText = 'No data available',
  touchLink = false,
  onGetTooltip = null,
  countries = {},
  countryNames = {},
  height = '',
  width = '100%',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSvgMap = async () => {
      // Only run in browser
      if (typeof window === 'undefined') return;

      // Prevent duplicate container divs with same targetId (can happen if two SVGMaps with same id)
      const exist = document.querySelectorAll(`#${targetId}.svg-map-container`);
      if (exist.length > 1) {
        console.warn(
          `[SVGMap] Multiple containers found with id="${targetId}". Check for duplicate mounts or duplicate targetId usage.`
        );
      }
      // Clean previous map content (if re-invoked)
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      try {
        // Dynamically import dependencies
        const svgPanZoom = await import('svg-pan-zoom');
        (window as any).svgPanZoom = svgPanZoom.default;

        // @ts-expect-error svgMap is not a default export
        const svgMapModule = await import('svgmap');
        const svgMap = svgMapModule.default;

        // Instantiate svgMap
        if (containerRef.current && isMounted) {
          // Set the container as the target element
          mapInstanceRef.current = new svgMap({
            targetElementID: targetId,
            data,
            minZoom,
            maxZoom,
            initialZoom,
            initialPan,
            zoomScaleSensitivity,
            mouseWheelZoomEnabled,
            mouseWheelZoomWithKey,
            mouseWheelKeyMessage,
            mouseWheelKeyMessageMac,
            colorMax,
            colorMin,
            colorNoData,
            flagType,
            flagURL,
            hideFlag,
            noDataText,
            touchLink,
            onGetTooltip,
            countries,
            countryNames,
          });
        }
      } catch (error) {
        console.error('Error initializing svgMap:', error);
      }
    };

    loadSvgMap();

    // Cleanup
    return () => {
      isMounted = false;
      mapInstanceRef.current = null; // Can't "destroy" svgMap, but clear ref
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [
    targetId,
    data,
    minZoom,
    maxZoom,
    initialZoom,
    initialPan,
    zoomScaleSensitivity,
    mouseWheelZoomEnabled,
    mouseWheelZoomWithKey,
    mouseWheelKeyMessage,
    mouseWheelKeyMessageMac,
    colorMax,
    colorMin,
    colorNoData,
    flagType,
    flagURL,
    hideFlag,
    noDataText,
    touchLink,
    onGetTooltip,
    countries,
    countryNames,
  ]);

  const containerStyles = {
    height,
    width,
    position: 'relative' as const,
  };

  return (
    <div
      ref={containerRef}
      className={`svg-map-container${className ? ' ' + className : ''}`}
      id={targetId}
      style={containerStyles}
    />
  );
};

export default SVGMap;
