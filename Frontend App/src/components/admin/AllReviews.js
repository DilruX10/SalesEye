import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect, useState } from "react";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	deleteReview,
	getProductReviews,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
	const [productId, setProductId] = useState(""); //productId--->initialized with an empty string/ setProductId--->update it.

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, reviews } = useSelector((state) => state.productReviews);
	const { isDeleted, error: deleteError } = useSelector(
		(state) => state.review
	);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (productId !== "") {
			// If productId has a value
			dispatch(getProductReviews(productId)); //get the product reviews for the specified product.
		}

		if (isDeleted) {
			alert.success("Review deleted successfully");
			dispatch({ type: DELETE_REVIEW_RESET }); //reset the state of isDeleted.
		}
	}, [dispatch, alert, error, productId, isDeleted, deleteError]);

	const deleteReviewHandler = (id) => {
		//delete a review with a given id and productId
		dispatch(deleteReview(id, productId));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(getProductReviews(productId)); //get the product reviews for a specified product
	}; //It is called when a form is submitted.

	// return sentiment of the review
	const reviewSentiment = (re) => {
		if (re < 0) return `Negative 😒`;
		else if (re > 0) return `Positive 😄`;
		else return `Neutral 😐`;
	};

	const setReviews = () => {
		//creates an object with columns and rows
		const data = {
			columns: [
				{
					label: "Review ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "Rating",
					field: "rating",
					sort: "asc",
				},
				{
					label: "Comment",
					field: "comment",
					sort: "asc",
				},
				{
					label: "User",
					field: "user",
					sort: "asc",
				},
				{
					label: "Sentiment",
					field: "sentiment",
					sort: "asc",
				},
				{
					label: "Actions",
					field: "actions",
				},
			],
			rows: [],
		};

		reviews.forEach((review) => {
			data.rows.push({
				id: review._id,
				rating: review.rating,
				comment: review.comment,
				sentiment: review.sentiment
					? reviewSentiment(review.sentiment) +
					  " [ " +
					  review.sentiment +
					  " ]"
					: "-",
				user: review.name,

				//delete button
				actions: (
					<button
						className="btn btn-danger py-1 px-2 ml-2"
						onClick={() => deleteReviewHandler(review._id)}
					>
						<i className="fa fa-trash"></i>
					</button>
				),
			});
		});

		return data; //---> used to render the table.
	};

	return (
		<Fragment>
			<MetaData title={"Product Reviews"} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<Fragment>
						<div className="row justify-content-center mt-5">
							<div className="col-5">
								<form onSubmit={submitHandler}>
									<div className="form-group">
										<label htmlFor="productId_field">
											Enter Product ID
										</label>
										<input
											type="text"
											id="productId_field"
											className="form-control"
											value={productId}
											onChange={(e) => setProductId(e.target.value)}
										/>
									</div>

									<button
										id="search_button"
										type="submit"
										className="btn btn-primary btn-block py-2"
									>
										SEARCH
									</button>
								</form>
							</div>
						</div>

						{reviews && reviews.length > 0 ? ( //checks whether reviews is truthy and has a length greater than zero.
							<MDBDataTable
								data={setReviews()}
								className="px-3"
								bordered
								striped
								hover
							/>
						) : (
							//If there are no reviews
							<p className="mt-5 text-center">No Reviews.</p>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductReviews;
