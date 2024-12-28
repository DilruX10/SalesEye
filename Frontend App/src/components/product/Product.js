import React from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../actions/cartActions";

const Product = ({ product, col }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const quantity = 1;
	const addToCart = (pid) => {
		dispatch(addItemToCart(pid, quantity));
		alert.success("Item Added to Cart");
	};

	return (
		<div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
			<div className="card p-3 rounded">
				<Link to={`/product/${product._id}`}>
					<img
						className="card-img-top mx-auto"
						src={product.images[0].url}
					/>
				</Link>
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">
						{" "}
						<Link to={`/product/${product._id}`}>
							{product.brand} {product.name} - {product.color}
						</Link>
					</h5>
					<div className="ratings mt-auto">
						<div className="rating-outer">
							<div
								className="rating-inner"
								style={{ width: `${(product.ratings / 5) * 100}%` }}
							></div>
						</div>
						<span id="no_of_reviews">
							({product.numOfReviews} Reviews)
						</span>
					</div>
					<p className="card-text">Rs {product.price}</p>
					{/*<Link
						to={`/product/${product._id}`}
						id="view_btn"
						className="btn btn-block"
					>
						View Details
                    </Link>*/}
					<button
						type="button"
						id="cart_btn"
						className="btn btn-primary d-inline ml-4"
						disabled={product.quantity === 0}
						onClick={() => addToCart(product._id)}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;
