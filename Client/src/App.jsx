//Client/App.jsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import AllProducts from "./Components/Products";
import Customers from "./Components/Customers";
import Purchases from "./Components/Purchased";
import ProductsByCategory from "./Components/ProductsByCategory";
import HomePage from "./Components/HomePage";
import Cart from "./Components/Cart";
import SinglePage from "./Components/SinglePageProduct";
import SignInPage from "./Components/SignInPage";
import SignUpPage from "./Components/SignUpPage";
import EditProduct from "./Containers/EditProduct";
import EditCustomer from "./Containers/EditCustomer";
import ProductsList from "./Components/ProductsList";
import CompletePurchasePage from "./Components/CompletePurchasePage";
import AddReview from "./Components/AddReview";
import PersonalPage from "./Components/PersonalPage";
import AuthLayout from "../AuthLayout"; // Import your AuthLayout here
import NotFoundPage from "./Components/NotFoundPage";
import MainLayout from "./Components/MainLayout";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      children: [
        { path: "SignInPage", element: <SignInPage /> },
        { path: "SignUpPage", element: <SignUpPage /> },
        {
          path: "/",
          element: <AuthLayout />,
          children: [
            { path: "HomePage", element: <HomePage /> },
            { path: "Products", element: <AllProducts /> },
            { path: "ProductsList", element: <ProductsList /> },
            { path: "product/:productId", element: <SinglePage /> },
            {
              path: "Products/EditProduct/:productId",
              element: <EditProduct />,
            },
            { path: "category/:categoryName", element: <ProductsByCategory /> },
            { path: "Customers", element: <Customers /> },
            { path: "Customers/EditCustomer", element: <EditCustomer /> },
            {
              path: "Customers/EditCustomer/:customerId",
              element: <EditCustomer />,
            },
            { path: "PersonalPage/:customerId", element: <PersonalPage /> },
            { path: "AddReview/:productId", element: <AddReview /> },
            { path: "Purchases", element: <Purchases /> },
            { path: "CompletePurchasePage", element: <CompletePurchasePage /> },
            { path: "cart", element: <Cart /> },
          ],
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <div id="root">
        <RouterProvider router={router} />
      </div>
    </Provider>
    // <div id="root">
    //   <Provider store={store}>
    //     <Router>
    //       <Routes>
    //         <Route path="/" element={<SignInPage />} />
    //         <Route path="/SignUpPage" element={<SignUpPage />} />

    //         <Route
    //           path="/"
    //           element={
    //             <AuthLayout>
    //               {/* <Routes> */}
    //               <Route path="/HomePage" element={<HomePage />} />
    //               {/* Product related routes */}
    //               <Route path="/Products" element={<AllProducts />} />
    //               <Route path="/ProductsList" element={<ProductsList />} />
    //               <Route path="/product/:productId" element={<SinglePage />} />
    //               <Route
    //                 path="/Products/EditProduct/:productId"
    //                 element={<EditProduct />}
    //               />
    //               <Route
    //                 path="/category/:categoryName"
    //                 element={<ProductsByCategory />}
    //               />
    //               {/* Customer related routes */}
    //               <Route path="/Customers" element={<Customers />} />
    //               <Route
    //                 path="/Customers/EditCustomer/"
    //                 element={<EditCustomer />}
    //               />
    //               <Route
    //                 path="/Customers/EditCustomer/:customerId"
    //                 element={<EditCustomer />}
    //               />
    //               <Route
    //                 path="/PersonalPage/:customerId"
    //                 element={<PersonalPage />}
    //               />
    //               <Route path="/AddReview/:productId" element={<AddReview />} />
    //               <Route path="/Purchases" element={<Purchases />} />
    //               <Route
    //                 path="/CompletePurchasePage"
    //                 element={<CompletePurchasePage />}
    //               />
    //               <Route path="/cart" element={<Cart />} />
    //               {/* </Routes> */}
    //             </AuthLayout>
    //           }
    //         />
    //         {/* Catch-all Route for 404s
    //         <Route path="*" element={<NotFoundPage />} />
    //         */}
    //         <Route path="*" element={<NotFoundPage />} />
    //       </Routes>
    //     </Router>
    //   </Provider>
    // </div>
  );
}

export default App;
