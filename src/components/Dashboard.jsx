import Image from 'next/image';
import styles from '../styles/Dashboard.module.scss';

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>

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
            <h2>Ali Khalilabadi</h2>
          </div>
        </div>
      </header>

      <section className={styles.balanceSection}>
        <h3>Total Balance</h3>
        <p className={styles.balanceAmount}>$72,829.62</p>
        <button className={styles.transferButton}>Transfer Funds</button>
      </section>

      <section className={styles.banksSection}>
        <h3>Connected Banks</h3>
        <ul className={styles.bankList}>
          <li>Bank of America</li>
          <li>Chase Bank</li>
          <li>Wells Fargo</li>
        </ul>
      </section>

      <section className={styles.transactionsSection}>
        <h3>Recent Transactions</h3>
        <ul className={styles.transactionList}>
          <li>
            <span>USDT to BTC</span>
            <span>+0.0116 BTC</span>
          </li>
          <li>
            <span>Withdrawal</span>
            <span>-$500.00</span>
          </li>
          <li>
            <span>Deposit</span>
            <span>+$1,000.00</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;