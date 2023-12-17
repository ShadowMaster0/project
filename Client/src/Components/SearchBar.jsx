import PropTypes from "prop-types";

function SearchBar({ productName, setProductName }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  productName: PropTypes.string.isRequired,
  setProductName: PropTypes.func.isRequired,
};

export default SearchBar;
