import React from 'react';
import './DailyPoints.css';
import { formatPoints } from '../utils/points';

interface DailyPointsProps {
  points: number;
}

const DailyPoints: React.FC<DailyPointsProps> = ({ points }) => {
  return (
    <div className="daily-points-card">
      <div className="points-label">Daily Points</div>
      <div className="points-value">{formatPoints(points)}</div>
    </div>
  );
};

export default DailyPoints;

