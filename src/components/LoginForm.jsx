import styles from '../styles/LoginForm.module.scss';

const LoginForm = () => {
  return (
    <div className={styles.loginFormContainer}>
      <h1 className={styles.brandName}>HOARD</h1>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter your username" 
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email" 
          />
        </div>

        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;