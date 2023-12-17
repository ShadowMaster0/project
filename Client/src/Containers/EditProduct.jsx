import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditProduct() {
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  console.log(productId);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEmailChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/Products/${productId}`
        );
        if (response.status === 200) {
          const fetchedProduct = response.data.product;
          setName(fetchedProduct.name || "");
          setDescription(fetchedProduct.description || "");
          setCategory(fetchedProduct.category || "");
        }
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    };

    fetchCustomer();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerInfo = {
      name,
      description,
      category,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/Products/${productId}`,
        customerInfo
      );

      if (response.status === 200) {
        console.log("Product updated successfully");
        window.alert(`Product updated successfully!`);
        navigate("/Products");
      }
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (
    <div className="EditProductPage">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleUsernameChange}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            category:
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleEmailChange}
              className="form-input"
            />
          </label>
        </div>
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
