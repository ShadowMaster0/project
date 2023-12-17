import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <ol>
          <Link to="/HomePage">Home Page</Link>
        </ol>
        <ol>
          <Link to="/category/Electronics">Electronics</Link>
        </ol>
        <ol>
          <Link to="/category/Fashion">Fashion</Link>
        </ol>
        <ol>
          <Link to="/category/Sports">Sports</Link>
        </ol>
        <ol>
          <Link to="/category/Movies">Movies</Link>
        </ol>
        <ol>
          <Link to="/category/Home & Garden">Home & Garden</Link>
        </ol>
      </ul>
    </nav>
  );
};

export default Navbar;
