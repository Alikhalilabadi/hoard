import React, { useState } from 'react';
import styles from '../styles/Transfer_window.module.scss';

const TransferWindow = ({ banks }) => {
  const [targetAccountId, setTargetAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [error, setError] = useState('');

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!targetAccountId || !amount || !selectedBank) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 5000);
      return;
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.transferWindow}>
      <h2 className={styles.title}>Transfer Money</h2>
      <form onSubmit={handleTransfer}>
        <div className={styles.formGroup}>
          <label htmlFor="targetAccountId">Target Account ID</label>
          <input
            type="text"
            id="targetAccountId"
            value={targetAccountId}
            onChange={(e) => setTargetAccountId(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bank">Select Bank</label>
          <select
            id="bank"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">Choose a bank</option>
            {banks || [].map((bank, index) => (
              <option key={index} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>Transfer</button>
      </form>
      {error && <div className={styles.errorPopup}>{error}</div>}
    </div>
    </div>
  );
};

export default TransferWindow;