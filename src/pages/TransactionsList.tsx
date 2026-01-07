import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import BalanceCard from '../components/BalanceCard';
import DailyPoints from '../components/DailyPoints';
import TransactionItem from '../components/TransactionItem';
import { WalletData, CardBalanceData, Transaction } from '../types';
import walletData from '../data/walletData.json';
import { calculateDailyPoints } from '../utils/points';
import './TransactionsList.css';

const TransactionsList: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState<WalletData>(walletData as WalletData);
  const [cardBalance, setCardBalance] = useState<CardBalanceData>({
    limit: 1500,
    balance: 0,
    available: 1500
  });
  const [dailyPoints, setDailyPoints] = useState<number>(0);

  useEffect(() => {
    const available = data.cardLimit - data.cardBalance;
    setCardBalance({
      limit: data.cardLimit,
      balance: data.cardBalance,
      available: available
    });

    const hasJsonPoints = typeof data.dailyPoints === 'number';
    if (hasJsonPoints) {
      setDailyPoints(data.dailyPoints);
    } else if (data.seasonStartDate) {
      setDailyPoints(calculateDailyPoints(data.seasonStartDate));
    } else {
      setDailyPoints(0);
    }
  }, [data]);

  const handleTransactionClick = (transaction: Transaction) => {
    navigate(`/transaction/${transaction.id}`, { state: { transaction } });
  };

  const latestTransactions = data.transactions.slice(0, 10);

  return (
    <div className="transactions-list-page">
      <div className="header-section">
        <div className="grid-container">
          <div className="left-column">
            <BalanceCard data={cardBalance} />
            <DailyPoints points={dailyPoints} />
          </div>
          
          <div className="right-column">
            <div className="no-payment-card">
              <div className="no-payment-content">
                <div className="no-payment-title">No Payment Due</div>
                <div className="no-payment-text">You've paid your September balance.</div>
              </div>
              <div className="no-payment-icon">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="transactions-wrapper">
        <h2 className="section-title">Latest Transactions</h2>
        <div className="transactions-section">
          <div className="transactions-list">
            {latestTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onClick={() => handleTransactionClick(transaction)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;

