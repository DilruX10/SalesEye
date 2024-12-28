import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import Loader from "./layout/Loader";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
	//match-->information about how a route matched the URL.

	const [currentPage, setCurrentPage] = useState(1); //[current state value, update the state]=useState(currentPage-->1)
	const [price, setPrice] = useState([1, 1000]);
	const [category, setCategory] = useState("");
	const [rating, setRating] = useState(0);

	const categories = [
		"Tshirt",
		"Shirt",
		"Trouser",
		"Jacket",
		"Short",
		"Bag",
		"Watches",
		"Shoes",
	];

	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, products, error, productsCount, filteredProductsCount } =
		useSelector((state) => state.products);

	const keyword = match.params.keyword; //Extract the keyword value from the match.params object

	const resPerPage = 6;

	useEffect(() => {
		//fetch the products from the backend API
		if (error) {
			return alert.error(error);
		}

		dispatch(getProducts(keyword, currentPage, price, category, rating));
	}, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber);
	} //asign page numbers

	let count = productsCount;
	if (keyword) {
		//if products available when searching count them
		count = filteredProductsCount;
	}

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={"Buy Best Products Online"} />

					<h1 id="products_heading">Our Products</h1>

					<section id="products" className="container mt-5">
						<div className="row">
							{true ? (
								<Fragment>
									<div className="col-6 col-md-3 mt-5 mb-5">
										<div className="px-5">
											<Range
												marks={{
													1: `Rs1`,
													1000: `Rs1000`,
												}}
												min={1}
												max={1000}
												defaultValue={[1, 1000]}
												tipFormatter={(value) => `Rs${value}`}
												tipProps={{
													placement: "top",
													visible: true,
												}}
												value={price}
												onChange={(price) => {
													setPrice(price);
												}}
											/>

											<hr className="my-5" />

											<div className="mt-5">
												<h4 className="mb-3">Categories</h4>

												<ul className="pl-0">
													<li
														style={{
															cursor: "pointer",
															listStyleType: "none",
														}}
														key="all"
														onClick={() => setCategory("")}
													>
														All
													</li>
													{categories.map((category) => (
														<li
															style={{
																cursor: "pointer",
																listStyleType: "none",
															}}
															key={category}
															onClick={() =>
																setCategory(category)
															}
														>
															{category}
														</li>
													))}
												</ul>
											</div>

											<hr className="my-3" />

											<div className="mt-5">
												<h4 className="mb-3">Ratings</h4>

												<ul className="pl-0">
													{[5, 4, 3, 2, 1, 0].map((star) => (
														<li
															style={{
																cursor: "pointer",
																listStyleType: "none",
															}}
															key={star}
															onClick={() => setRating(star)}
														>
															<div className="rating-outer">
																<div
																	className="rating-inner"
																	style={{
																		width: `${star * 20}%`,
																	}}
																></div>
															</div>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>

									<div className="col-6 col-md-9">
										<div className="row">
											{products.map((product) => (
												<Product
													key={product._id}
													product={product}
													col={4}
												/>
											))}
										</div>
									</div>
								</Fragment>
							) : (
								products.map((product) => (
									<Product
										key={product._id}
										product={product}
										col={4}
									/>
								))
							)}
						</div>
					</section>

					{resPerPage <= count && (
						<div className="d-flex justify-content-center mt-5">
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resPerPage}
								totalItemsCount={productsCount}
								onChange={setCurrentPageNo}
								nextPageText={">"}
								prevPageText={"<"}
								firstPageText={"<<"}
								lastPageText={">>"}
								itemClass="page-item"
								linkClass="page-link"
							/>
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default Home;
