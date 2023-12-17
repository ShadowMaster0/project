import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddReview = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const customer = JSON.parse(localStorage.getItem("userData"));
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/Products/${productId}`);
        if (res.status === 200) {
          setSingleProduct(res.data.product);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addReview = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toLocaleDateString("en-CA");
    const newReview = {
      productId: productId,
      customerName: customer?.user.name,
      date: currentDate,
      review: review,
    };

    try {
      const res = await axios.post("http://localhost:8000/Reviews", newReview);
      if (res.status === 201) {
        console.log("Reviews added");
      }
    } catch (error) {
      console.error("Error adding reviews:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Add Reviews</h2>
      <div key={singleProduct._id} className="Product">
        <h2>{singleProduct.name}</h2>
        <div>{singleProduct.img}</div>
      </div>
      <form onSubmit={addReview}>
        Review: 
        <textarea
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="2"
        />
        <button type="submit">Add Review</button>
      </form>
      <br />
      <button onClick={() => navigate("/HomePage")}>Back To Home Page</button>
    </div>
  );
};

export default AddReview;