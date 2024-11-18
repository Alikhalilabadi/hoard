import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Dashboard.module.scss";
import axios from "axios";

function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const fetchUpdatedUserData = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const password = localStorage.getItem("password");
      if (!authToken) {
        router.push("/");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/login`,
        new URLSearchParams({ email: authToken, password: password }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const updatedUserData = response.data.user;
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);

      if (updatedUserData.banks.length > 0) {
        setSelectedBank(updatedUserData.banks[0]);
      }
    } catch (err) {
      console.error("Failed to fetch updated user data:", err);
    }
  };

  useEffect(() => {
    fetchUpdatedUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleTransferClick = () => {
    if (selectedBank) {
      localStorage.setItem("selectedBank", JSON.stringify(selectedBank));
      router.push("/transfer_window");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("selectedBank");
    localStorage.removeItem("password");
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
          <button className={styles.transferButton} onClick={handleTransferClick}>
            Transfer Funds
          </button>
        </section>

          <section className={styles.banksSection}>
            <h3>Connected Banks</h3>
            <ul className={styles.bankList}>
              {userData.banks.map((bank, index) => (
                <li
                  key={bank.bank_id}
                  style = {{cursor: 'pointer'}}
                  className={
                    selectedBank?.bank_id === bank.bank_id
                      ? styles.selectedBank
                      : ""
                  }
                  onClick={() => handleBankClick(bank)}
                >
                  {bank.bank_name} - {bank.account_type} - {bank.account_id}
                </li>
              ))}
            </ul>
          </section>

          {/* <section className={styles.transactionsSection}>
            <h3>Recent Transactions</h3>
            <ul className={styles.transactionList}>
              {userData.recent_transactions.map((transaction) => (
                <li key={transaction.id}>
                  <span>{transaction.type}</span>
                  <span>{transaction.amount}</span>
                </li>
              ))}
            </ul>
          </section> */}

          <button className={styles.transferButton} onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;