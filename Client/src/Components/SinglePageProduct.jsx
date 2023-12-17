import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../Store/Actions/cartActions";
import PropTypes from "prop-types";
import TempCart from "./TempCart";
import axios from "axios";
import { useState, useEffect } from "react";

function SinglePage() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [productSpecificReviews, setProductSpecificReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resProduct = await axios.get(
          `http://localhost:8000/Products/${productId}`
        );
        if (resProduct.status === 200) {
          setSingleProduct(resProduct.data.product);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const resReviews = await axios.get(`http://localhost:8000/Reviews`);
        if (resReviews.status === 200) {
          const reviewsForProduct = resReviews.data.reviews.filter((review) => {
            return review.productId === productId;
          });
          setProductSpecificReviews(reviewsForProduct);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchReviews();
  }, [productId]);

  const onAddProduct = () => {
    dispatch(addProductToCart(singleProduct));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <div>
        <TempCart />
      </div>
      <div key={singleProduct._id} className="Product">
        <h2>{singleProduct.name}</h2>
        <div>{singleProduct.img}</div>
        <label> price: {singleProduct.price}$</label>
      </div>

      <div className="ProductBar"></div>
      <label> description: {singleProduct.description}</label>
      <br />
      {userType === "admin" ? (
        <>
          <Link to={`/Products/EditProduct/${singleProduct._id}`}>
            <button>Edit</button>
          </Link>
          &nbsp;&nbsp;
          <button onClick={onAddProduct}>Add</button>
        </>
      ) : (
        <button onClick={onAddProduct}>Add</button>
      )}
      <div>
        <Link to={`/AddReview/${singleProduct._id}`}>
          <button>Add FeedBack</button>
        </Link>
      </div>
      <div>
        {productSpecificReviews && productSpecificReviews.length > 0 ? (
          productSpecificReviews.map((review) => (
            <div key={review._id}>
              <p>{review.review}</p>
              <p>By: {review.customerName}</p>
              <p>Date: {review.date}</p>
            </div>
          ))
        ) : (
          <p>No reviews for this product yet.</p>
        )}
      </div>
    </div>
  );
}

SinglePage.propTypes = {
  singleProduct: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
};

export default SinglePage;
