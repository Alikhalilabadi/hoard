import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Purchase_page.module.scss";
import { useRouter } from "next/router";

export default function PurchasePage() {
  const [customerID, setCustomerID] = useState("");
  const [productID, setProductID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      router.push("/customer_login");
    } else {
      // Auth logic
    }
  }, [router]);

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}purchase`, {
        customer_id: customerID,
        product_id: productID,
        quantity: parseInt(quantity),
        new_address: newAddress,
      });
      setMessage(response.data.message);
      setError(false);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Failed to purchase product");
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Purchase Product</h1>
      <input
        type="text"
        placeholder="Customer ID"
        className={styles.inputField}
        value={customerID}
        onChange={(e) => setCustomerID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product ID"
        className={styles.inputField}
        value={productID}
        onChange={(e) => setProductID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Quantity"
        className={styles.inputField}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Address"
        className={styles.inputField}
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
      />
      <button className={styles.button} onClick={handlePurchase}>
        Purchase
      </button>
      {message && (
        <p className={`${styles.message} ${error ? styles.error : styles.success}`}>
          {message}
        </p>
      )}
    </div>
  );
}