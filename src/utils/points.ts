const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const calculateDailyPoints = (seasonStartDate: string, currentDate: Date = new Date()): number => {
  const start = new Date(seasonStartDate);
  const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());

  const diffDays = Math.floor((today.getTime() - startDay.getTime()) / MS_PER_DAY) + 1;
  const dayIndex = Math.min(diffDays, 120);

  if (dayIndex <= 0) return 0;
  if (dayIndex === 1) return 2;
  if (dayIndex === 2) return 3;

  let prevPrev = 2; // day 1
  let prev = 3;     // day 2

  for (let day = 3; day <= dayIndex; day++) {
    const next = prevPrev + prev * 0.6;
    prevPrev = prev;
    prev = next;
  }

  return Math.round(prev);
};

export const formatPoints = (points: number): string => {
  if (!Number.isFinite(points) || points < 0) return '0';
  const safe = Math.min(points, 999_000);
  if (safe >= 1000) return `${Math.floor(safe / 1000)}K`;
  return Math.round(safe).toString();
};

