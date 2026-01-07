import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Transaction } from '../types';
import walletData from '../data/walletData.json';
import './TransactionDetail.css';

const TransactionDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const data = walletData as unknown as { transactions: Transaction[] };
  const transaction: Transaction | undefined = location.state?.transaction || 
    data.transactions.find(t => t.id === id);

  if (!transaction) {
    return (
      <div className="transaction-detail-page">
        <div className="error-message">Transaction not found</div>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).slice(-2)}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="transaction-detail-page">
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      
      <div className="detail-content">
        <div className="detail-amount">
          ${transaction.amount.toFixed(2)}
        </div>
        
        <div className="detail-name">{transaction.name}</div>
        <div className="detail-date">{formatDate(transaction.date)}</div>

        <div className="detail-section">
          <div className="detail-row">
            <span className="detail-label">
              <span >Status:</span> {transaction.status === 'approved' ? 'Approved' : 'Pending'}
            </span>
            <span className="detail-sublabel">
              {transaction.cardUsed || 'RBC Bank Debit Card'}
            </span>
          </div>
          
          
          <div className="detail-row-other detail-total">
            <span className="detail-label">Total</span>
            <span className="detail-value">
              ${transaction.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;

