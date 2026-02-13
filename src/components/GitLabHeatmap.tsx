"use client";

import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
}

export default function GitLabHeatmap() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);

  useEffect(() => {
    // Generate sample contribution data for the heatmap
    const generateContributions = () => {
      const days: ContributionDay[] = [];
      const today = new Date();

      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Generate realistic contribution patterns
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const random = Math.random();

        let count = 0;
        if (!isWeekend && random > 0.2) {
          count = Math.floor(Math.random() * 10) + 1;
        } else if (isWeekend && random > 0.7) {
          count = Math.floor(Math.random() * 5) + 1;
        }

        days.push({
          date: date.toISOString().split('T')[0],
          count
        });
      }

      setContributions(days);
    };

    generateContributions();
  }, []);

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= 2) return 'bg-orange-200 dark:bg-orange-900/50';
    if (count <= 5) return 'bg-orange-300 dark:bg-orange-800/60';
    if (count <= 8) return 'bg-orange-400 dark:bg-orange-700/70';
    return 'bg-orange-500 dark:bg-orange-600/80';
  };

  // Group contributions into weeks
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributions.forEach((day) => {
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

  return (
    <div className="w-full">
      <div className="flex gap-0.5">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 pr-1 text-[10px] text-gray-500 dark:text-gray-400">
          <div className="h-2.5"></div>
          <div className="h-2.5 leading-[10px]">Mon</div>
          <div className="h-2.5"></div>
          <div className="h-2.5 leading-[10px]">Wed</div>
          <div className="h-2.5"></div>
          <div className="h-2.5 leading-[10px]">Fri</div>
          <div className="h-2.5"></div>
        </div>

        {/* Contribution grid */}
        <div className="flex-1">
          <div className="flex gap-0.5">
            {weeks.slice(-52).map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-0.5">
                {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                  const day = week.find(d => new Date(d.date).getDay() === dayIndex);
                  return (
                    <div
                      key={dayIndex}
                      className={`w-2.5 h-2.5 rounded-[2px] ${
                        day ? getIntensity(day.count) : 'bg-transparent'
                      }`}
                      title={day ? `${day.date}: ${day.count} contributions` : ''}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-600 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-0.5">
          {[0, 2, 5, 8, 10].map((count, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${getIntensity(count)}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}