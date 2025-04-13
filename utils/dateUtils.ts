import { format } from 'date-fns';

export type DateRangeType =
  | 'lastHour'
  | 'today'
  | 'yesterday'
  | 'last24Hours'
  | 'last7Days'
  | 'thisWeek'
  | 'lastWeek'
  | 'last30Days'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'lastYear'
  | 'custom';

export const getDateRange = (type: DateRangeType, customStart?: Date, customEnd?: Date) => {
  const now = new Date();
  let start: Date;
  let end = new Date(now);

  // Set end to the end of the current time by default
  end.setSeconds(59, 999);

  switch (type) {
    case 'lastHour': {
      // Last hour
      start = new Date(now);
      start.setHours(now.getHours() - 1);
      start.setMinutes(now.getMinutes(), 0, 0);
      break;
    }
    case 'today': {
      // Start of today
      start = new Date(now);
      start.setHours(0, 0, 0, 0);
      // End of today
      end.setHours(23, 59, 59, 999);
      break;
    }
    case 'yesterday': {
      // Start of yesterday
      start = new Date(now);
      start.setDate(now.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      // End of yesterday
      end = new Date(start);
      end.setHours(23, 59, 59, 999);
      break;
    }
    case 'last24Hours': {
      // 24 hours ago until now
      start = new Date(now);
      start.setHours(now.getHours() - 24);
      break;
    }
    case 'last7Days': {
      // 7 days ago until now
      start = new Date(now);
      start.setDate(now.getDate() - 7);
      // Start from beginning of that day
      start.setHours(0, 0, 0, 0);
      // End of today
      end.setHours(23, 59, 59, 999);
      break;
    }
    case 'thisWeek': {
      // Start of current week (Sunday or Monday depending on locale)
      start = new Date(now);
      const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const diff = dayOfWeek; // Assuming week starts on Sunday
      // const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Use this if week starts on Monday
      start.setDate(now.getDate() - diff);
      start.setHours(0, 0, 0, 0);
      // End of today
      end.setHours(23, 59, 59, 999);
      break;
    }
    case 'lastWeek': {
      // Start of last week
      start = new Date(now);
      const dayOfWeek = now.getDay();
      const diff = dayOfWeek + 7; // Go back to last week's start
      // const diff = dayOfWeek === 0 ? 13 : dayOfWeek + 6; // Use this if week starts on Monday
      start.setDate(now.getDate() - diff);
      start.setHours(0, 0, 0, 0);

      // End of last week
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    }
    case 'last30Days': {
      // 30 days ago until now
      start = new Date(now);
      start.setDate(now.getDate() - 30);
      start.setHours(0, 0, 0, 0);
      // End of today
      end.setHours(23, 59, 59, 999);
      break;
    }
    case 'thisMonth': {
      // Start of current month
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      // End of today
      end.setHours(23, 59, 59, 999);
      break;
    }
    case 'lastMonth': {
      // Start of last month
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
      // End of last month
      end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;
    }
    case 'thisYear': {
      // Start of current year
      start = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
      // End of today
      end.setHours(23, 59, 59, 999);
      break;
    }
    case 'lastYear': {
      // Start of last year
      start = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
      // End of last year
      end = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
      break;
    }
    case 'custom': {
      // Custom date range
      if (customStart && customEnd) {
        start = new Date(customStart);
        end = new Date(customEnd);
        // Ensure end is at the end of the day
        end.setHours(23, 59, 59, 999);
      } else {
        // Default to last 30 days if custom dates are invalid
        start = new Date(now);
        start.setDate(now.getDate() - 30);
        start.setHours(0, 0, 0, 0);
      }
      break;
    }
    default: {
      // Default to today
      start = new Date(now);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }
  }

  return { start, end };
};

// Format date for display
export const formatDate = (date: Date | string): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return format(dateObject, 'MMM dd, yyyy');
};

// Format date for API calls
export const formatDateForApi = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// Format date for chart labels
export const formatDateForChart = (date: Date | string): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return format(dateObject, 'MMM dd');
};

// Format time for chart labels
export const formatTimeForChart = (hour: number): string => {
  const amPm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}${amPm}`;
};

// Creates date ranges for dropdown
export const dateRangeOptions = [
  { label: 'Last Hour', value: 'lastHour' },
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 24 Hours', value: 'last24Hours' },
  { label: 'Last 7 Days', value: 'last7Days' },
  { label: 'This Week', value: 'thisWeek' },
  { label: 'Last Week', value: 'lastWeek' },
  { label: 'Last 30 Days', value: 'last30Days' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'This Year', value: 'thisYear' },
  { label: 'Last Year', value: 'lastYear' },
  { label: 'Custom Range', value: 'custom' },
];
