import { useSelector } from "react-redux";
import { useState } from "react";

const Purchases = () => {
  const purchases = useSelector((state) => state.purchases.purchases);
  const products = useSelector((state) => state.products.products);
  const customers = useSelector((state) => state.customers.customers);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [date, setDate] = useState("");

  let filteredPurchases = purchases;

  if (selectedProductId) {
    filteredPurchases = filteredPurchases.filter(
      (purchase) => purchase.productId === selectedProductId
    );
  }

  if (selectedCustomerId) {
    filteredPurchases = filteredPurchases.filter(
      (purchase) => purchase.customerId === selectedCustomerId
    );
  }

  if (date) {
    filteredPurchases = filteredPurchases.filter(
      (purchase) => purchase.date === date
    );
  }

  return (
    <div>
      <h2>Purchases</h2>
      <select
        value={selectedCustomerId}
        onChange={(e) => setSelectedCustomerId(e.target.value)}
      >
        <option value="">All Customers</option>
        {customers &&
          customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
      </select>
      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
      >
        <option value="">All Products</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={() => {}}>Search</button>
      {filteredPurchases.map((purchase) => (
        <p key={purchase.id}>
          Customer ID: {purchase.customerId}, Product ID: {purchase.productId},
          Date: {purchase.date}
        </p>
      ))}
    </div>
  );
};

export default Purchases;
