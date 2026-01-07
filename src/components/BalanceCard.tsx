import React from 'react';
import './BalanceCard.css';
import { CardBalanceData } from '../types';

interface BalanceCardProps {
  data: CardBalanceData;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ data }) => {
  return (
    <div className="balance-card">
      <div className="balance-section">
        <h3>Card Balance</h3>
        <div className="balance-amount">${data.balance.toFixed(2)}</div>
        <div className="available-text">${data.available.toFixed(2)} Available</div>
      </div>
    </div>
  );
};

export default BalanceCard;

