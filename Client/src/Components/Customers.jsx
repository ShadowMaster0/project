import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/Customers");
        if (res.status === 200) {
          setCustomers(res.data.customers);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCustomers();
  }, []);
  return (
    <div>
      <h2>Customers</h2>
      <table border={5}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer username</th>
            <th>Customer email</th>
            <th>Customer city</th>
            <th>Customer purchases</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>
                <Link to={`/Customers/EditCustomer/${customer._id}`}>
                  {`${customer.name}`}
                </Link>
              </td>
              <td>
                <Link to={`/Customers/EditCustomer/${customer._id}`}>
                  {`${customer.username}`}
                </Link>
              </td>
              <td>
                <Link to={`/Customers/EditCustomer/${customer._id}`}>
                  {`${customer.email}`}
                </Link>
              </td>
              <td>
                <Link to={`/Customers/EditCustomer/${customer._id}`}>
                  {`${customer.city}`}
                </Link>
              </td>
              <td>
                <Link to={`/Customers/EditCustomer/${customer._id}`}>
                  {`${customer.purchases}`}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
