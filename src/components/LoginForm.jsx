import { useState } from "react";
import axios from "axios";
import styles from "../styles/LoginForm.module.scss";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}bank_user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("password", response.data.password);
      localStorage.setItem("userData", JSON.stringify(user));

      router.push("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || "Login failed!");
      } else {
        setError("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h1 className={styles.brandName}>HOARD</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;