import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Dashboard.module.scss";

function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedUserData = localStorage.getItem("userData");

    if (!authToken || !storedUserData) {
      router.push("/");
    } else {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);

      if (parsedUserData.banks.length > 0) {
        setSelectedBank(parsedUserData.banks[0]);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    router.push("/");
  };

  const handleBankClick = (bank) => {
    setSelectedBank(bank);
  };

  return (
    <div className={styles.dashboardContainer}>
      {userData && (
        <>
          <header className={styles.header}>
            <div className={styles.profile}>
              <Image
                src="/images/danny.png"
                width={100}
                height={100}
                alt="Customer Profile"
                className={styles.profileImage}
              />
              <div className={styles.profileInfo}>
                <h2>{userData.name}</h2>
              </div>
            </div>
          </header>

          <section className={styles.balanceSection}>
            <h3>Total Balance</h3>
            <p className={styles.balanceAmount}>
              ${selectedBank ? selectedBank.balance.toFixed(2) : "0.00"}
            </p>
          </section>

          <section className={styles.banksSection}>
            <h3>Connected Banks</h3>
            <ul className={styles.bankList}>
              {userData.banks.map((bank, index) => (
                <li
                  key={bank.bank_id}
                  className={
                    selectedBank?.bank_id === bank.bank_id
                      ? styles.selectedBank
                      : ""
                  }
                  onClick={() => handleBankClick(bank)}
                >
                  {bank.bank_name} - {bank.account_type}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.transactionsSection}>
            <h3>Recent Transactions</h3>
            <ul className={styles.transactionList}>
              {userData.recent_transactions.map((transaction) => (
                <li key={transaction.id}>
                  <span>{transaction.type}</span>
                  <span>{transaction.amount}</span>
                </li>
              ))}
            </ul>
          </section>

          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;