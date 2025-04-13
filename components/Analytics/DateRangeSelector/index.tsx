import React, { useState } from 'react';

import { Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { DateRangeType } from '@/utils/dateUtils';
import { dateRangeOptions, formatDate, getDateRange } from '@/utils/dateUtils';

interface DateRangeSelectorProps {
  onDateRangeChange: (start: Date, end: Date, type: DateRangeType) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onDateRangeChange }) => {
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('last30Days');
  const [customDateRange, setCustomDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Get dates based on selected range type
  const { start, end } = getDateRange(dateRangeType, customDateRange.start, customDateRange.end);

  const handleDateRangeTypeChange = (value: string) => {
    const type = value as DateRangeType;
    setDateRangeType(type);

    const { start, end } = getDateRange(type, customDateRange.start, customDateRange.end);
    onDateRangeChange(start, end, type);

    // Close calendar if user selects a predefined range
    if (type !== 'custom') {
      setIsCalendarOpen(false);
    } else {
      setIsCalendarOpen(true);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) return;

    // If no start date is selected or both dates are selected, set the new start date
    if (!customDateRange.start || (customDateRange.start && customDateRange.end)) {
      const newRange = { start: date, end: undefined };
      setCustomDateRange(newRange);
    }
    // If only start date is selected, set the end date
    else {
      // Make sure end date is not before start date
      const newEnd = date < customDateRange.start ? customDateRange.start : date;
      const newStart = date < customDateRange.start ? date : customDateRange.start;

      const newRange = { start: newStart, end: newEnd };
      setCustomDateRange(newRange);

      // Call the parent handler with the new range
      onDateRangeChange(newStart, newEnd, 'custom');
    }
  };

  const calendarText =
    customDateRange.start && customDateRange.end
      ? `${formatDate(customDateRange.start)} - ${formatDate(customDateRange.end)}`
      : customDateRange.start
        ? `${formatDate(customDateRange.start)} - Select end date`
        : 'Select date range';

  return (
    <div className="flex items-center gap-2">
      <Select value={dateRangeType} onValueChange={handleDateRangeTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          {dateRangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {dateRangeType === 'custom' && (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button className="flex gap-2 min-w-[220px] justify-start" variant="neutral">
              <Calendar className="h-4 w-4" />
              <span>{calendarText}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <CalendarComponent
              defaultMonth={customDateRange.start}
              disabled={{
                after: new Date(),
              }}
              mode="range"
              numberOfMonths={2}
              selected={{
                from: customDateRange.start,
                to: customDateRange.end,
              }}
              onSelect={(range) => {
                handleCalendarSelect(range?.from);
                handleCalendarSelect(range?.to);
              }}
            />
          </PopoverContent>
        </Popover>
      )}

      {dateRangeType !== 'custom' && (
        <div className="text-sm text-muted-foreground">
          {formatDate(start)} - {formatDate(end)}
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
