import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const { data , isLoading, isError} = useLatestProductsQuery("");
  const dispatch = useDispatch()

  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock < 1) return toast.error("Out Of Stock")
      dispatch(addToCart(cartItem))
    toast.success("Added to Cart")

  };


  if(isError) toast.error("Cannot fetch the products")
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Product
        <Link className="findmore" to={"/search"}>
          More
        </Link>
      </h1>
      <main>
        
        {isLoading ? <Skeleton width="80vw"/> :  data?.products.map((i) => (
          <ProductCard
          key={i._id}
            productId={i._id}
            name={i.name}
            price={i.price}
            stock={i.stock}
            handler={addToCartHandler}
            photo={i.photo}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
