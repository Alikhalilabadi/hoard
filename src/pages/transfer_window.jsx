import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Transfer_window.module.scss';

const TransferWindow = () => {
  const router = useRouter();
  const [targetAccountId, setTargetAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      router.push("/");
    } else {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const bankData = userData?.banks || [];
      const initialBank = JSON.parse(localStorage.getItem("selectedBank")) || bankData[0];
      setBanks(bankData);
      setSelectedBank(initialBank);
    }
  }, [router]);

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!targetAccountId || !amount || !selectedBank) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 5000);
      return;
    }
    console.log(`Transfer ${amount} to ${targetAccountId} from bank ${selectedBank.bank_name}`);
  };

  const handleBankChange = (e) => {
    const selectedBankId = parseInt(e.target.value, 10);
    const newSelectedBank = banks.find((bank) => bank.bank_id === selectedBankId);
    setSelectedBank(newSelectedBank);
  };

  return (
    <div className={styles.container}>
      <div className={styles.transferWindow}>
        <h2 className={styles.title}>Transfer Money</h2>
        <p className={styles.selectedBankBalance}>
          Balance: ${selectedBank ? selectedBank.balance.toFixed(2) : "0.00"}
        </p>
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
              value={selectedBank?.bank_id || ""}
              onChange={handleBankChange}
            >
              <option value="" disabled>
                Choose a bank
              </option>
              {banks.map((bank) => (
                <option key={bank.bank_id} value={bank.bank_id}>
                  {bank.bank_name} - {bank.account_type}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Transfer
          </button>
        </form>
        {error && <div className={styles.errorPopup}>{error}</div>}
      </div>
    </div>
  );
};

export default TransferWindow;