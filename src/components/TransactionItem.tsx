import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMobile, 
  faWallet, 
  faStore, 
  faBullseye, 
  faGlobe, 
  faTv,
  faShoppingCart,
  faQuestion
} from '@fortawesome/free-solid-svg-icons';
import './TransactionItem.css';
import { Transaction } from '../types';

interface TransactionItemProps {
  transaction: Transaction;
  onClick: () => void;
}

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    apple: faMobile,
    wallet: faWallet,
    store: faStore,
    bullseye: faBullseye,
    globe: faGlobe,
    tv: faTv,
    'shopping-cart': faShoppingCart
  };
  return icons[iconName] || faQuestion;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Reset hours for accurate day comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const transactionDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const diffTime = today.getTime() - transactionDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Yesterday
  if (diffDays === 1) {
    return 'Yesterday';
  }
  
  // Within the last 7 days - show day name
  if (diffDays >= 0 && diffDays <= 7) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  // Older dates - show as M/D/YY
  return `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).slice(-2)}`;
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {
  const getRandomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    const hash = transaction.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="transaction-item" onClick={onClick}>
      <div className="transaction-icon" style={{ backgroundColor: getRandomColor() }}>
        <FontAwesomeIcon icon={getIcon(transaction.icon)} />
      </div>
      <div className="transaction-info">
        <div className="transaction-name">{transaction.name}</div>
        <div className="transaction-description">
          {transaction.status === 'pending' && <span className="pending-badge"></span>}
          {transaction.description}
        </div>
        <div className="transaction-date">
          {transaction.authorizedUser && `${transaction.authorizedUser} – `}
          {formatDate(transaction.date)}
        </div>
      </div>
      <div className="transaction-right">
        <div className="amount-with-percentage">
          <div className="transaction-amount">
            {transaction.type === 'payment' ? '+' : ''}${transaction.amount.toFixed(2)}
          </div>
          {transaction.percentage && (
            <div className="transaction-percentage">{transaction.percentage}%</div>
          )}
        </div>
        <div className="transaction-arrow">›</div>
      </div>
    </div>
  );
};

export default TransactionItem;

