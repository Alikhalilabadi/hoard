import styles from '../styles/Dashboard.module.scss';

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        HOARD
      </header>
      <section className={styles.section}>
        <h2>Total Money</h2>
      </section>
      <section className={styles.section}>
        <h2>List of Connected Banks</h2>
      </section>
      <section className={styles.section}>
        <h2>Statements</h2>
      </section>
      <section className={styles.section}>
        <h2>Marketplace</h2>
      </section>
    </div>
  );
}

 
export default Dashboard;