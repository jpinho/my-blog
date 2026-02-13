"use client";

import { useEffect, useState } from "react";

interface DayContribution {
  date: string;
  count: number;
  level: number;
}

interface GitLabContributionGraphProps {
  username?: string;
}

export default function GitLabContributionGraph({ username = "j.pinho" }: GitLabContributionGraphProps) {
  const [contributions, setContributions] = useState<DayContribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate a year of contribution data based on the activity pattern
    const generateContributions = () => {
      const days: DayContribution[] = [];
      const today = new Date();
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);

      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        // Simulate realistic contribution patterns
        let count = 0;
        const random = Math.random();

        if (isWeekend) {
          // Lower activity on weekends
          if (random > 0.7) count = Math.floor(Math.random() * 3) + 1;
        } else {
          // Higher activity on weekdays
          if (random > 0.3) count = Math.floor(Math.random() * 8) + 1;
          if (random > 0.8) count = Math.floor(Math.random() * 5) + 5;
        }

        const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4;

        days.push({
          date: d.toISOString().split('T')[0],
          count,
          level
        });
      }

      setContributions(days);
      setLoading(false);
    };

    generateContributions();
  }, []);

  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-100 dark:bg-gray-800';
      case 1: return 'bg-orange-200 dark:bg-orange-900';
      case 2: return 'bg-orange-300 dark:bg-orange-800';
      case 3: return 'bg-orange-400 dark:bg-orange-700';
      case 4: return 'bg-orange-500 dark:bg-orange-600';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  // Group contributions by week
  const weeks: DayContribution[][] = [];
  let currentWeek: DayContribution[] = [];

  contributions.forEach((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Only show the last 52 weeks
  const displayWeeks = weeks.slice(-52);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const monthLabels = [];
  for (let i = 0; i < 12; i++) {
    monthLabels.push(months[(currentMonth - 11 + i + 12) % 12]);
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Month labels */}
        <div className="flex gap-[3px] mb-2 ml-8">
          {monthLabels.map((month, i) => (
            <div key={i} className="text-xs text-gray-600 dark:text-gray-400" style={{ width: '46px' }}>
              {month}
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] mr-2 text-xs text-gray-600 dark:text-gray-400">
            <div style={{ height: '11px' }}></div>
            <div style={{ height: '11px' }}>Mon</div>
            <div style={{ height: '11px' }}></div>
            <div style={{ height: '11px' }}>Wed</div>
            <div style={{ height: '11px' }}></div>
            <div style={{ height: '11px' }}>Fri</div>
            <div style={{ height: '11px' }}></div>
          </div>

          {/* Contribution grid */}
          <div className="flex gap-[3px]">
            {displayWeeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                  const day = week.find(d => new Date(d.date).getDay() === dayIndex);
                  return (
                    <div
                      key={dayIndex}
                      className={`w-[11px] h-[11px] rounded-sm ${
                        day ? getColorClass(day.level) : 'bg-transparent'
                      }`}
                      title={day ? `${day.date}: ${day.count} contributions` : ''}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
          <span>Less</span>
          <div className="flex gap-[3px]">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`w-[11px] h-[11px] rounded-sm ${getColorClass(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}