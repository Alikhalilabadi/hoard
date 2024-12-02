import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Purchase_page.module.scss";
import { useRouter } from "next/router";

export default function PurchasePage() {
  const [customerData, setCustomerData] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [productID, setProductID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [addressMessage, setAddressMessage] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const customerData = localStorage.getItem("customerData");
    if (!authToken || !customerData) {
      router.push("/customer_login");
    } else {
      setCustomerData(JSON.parse(customerData));
      setCustomerID(JSON.parse(customerData).id);
    }
  }, [router]);

  const handleAddressChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}customer/customer/${customerID}/address`,
        { new_address: newAddress }
      );
      setAddressMessage(response.data.message);
      setError(false);
    } catch (err) {
      setAddressMessage("Failed to update address");
      setError(true);
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}purchase`, {
        customer_id: parseInt(customerID),
        product_id: parseInt(productID),
        quantity: parseInt(quantity),
        new_address: newAddress,
      });
      setPurchaseMessage(response.data.message);
      setError(false);
    } catch (err) {
      const errorDetail = err.response?.data?.detail;
      if (Array.isArray(errorDetail)) {
        setPurchaseMessage(errorDetail.map((item) => item.msg).join(", "));
      } else if (typeof errorDetail === "string") {
        setPurchaseMessage(errorDetail);
      } else {
        setPurchaseMessage("Failed to purchase product");
      }
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      {customerData && (
        <header className={styles.header}>
          <h2>Welcome, Customer #{customerData.id}</h2>
          <p>Current Address: {customerData.customerAddress}</p>
          <form onSubmit={handleAddressChange} className={styles.addressForm}>
            <h3>Update Address</h3>
            <input
              type="text"
              placeholder="Customer ID"
              className={styles.inputField}
              value={customerID}
              readOnly
            />
            <input
              type="text"
              placeholder="New Address"
              className={styles.inputField}
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>
              Update Address
            </button>
            {addressMessage && (
              <p className={`${styles.message} ${error ? styles.error : styles.success}`}>
                {addressMessage}
              </p>
            )}
          </form>
        </header>
      )}
      <main>
        <h1>Purchase Product</h1>
        <form className={styles.purchaseForm} onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Customer ID"
            className={styles.inputField}
            value={customerID}
            readOnly
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
        </form>
        {purchaseMessage && (
          <p className={`${styles.message} ${error ? styles.error : styles.success}`}>
            {purchaseMessage}
          </p>
        )}
      </main>
    </div>
  );
}