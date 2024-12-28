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

const ProductReviews = ({ match }) => {
	var pid = match.params.id;

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, reviews } = useSelector((state) => state.productReviews);
	const { isDeleted, error: deleteError } = useSelector(
		(state) => state.review
	);

	useEffect(() => {
		//get the product reviews for the specified product.
		dispatch(getProductReviews(pid));

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success("Review deleted successfully");
			dispatch({ type: DELETE_REVIEW_RESET }); //reset the state of isDeleted.
		}
	}, [dispatch, alert, error, pid, isDeleted, deleteError]);

	const deleteReviewHandler = (id) => {
		//delete a review with a given id and productId
		dispatch(deleteReview(id, pid));
	};

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
						<MDBDataTable
							data={setReviews()}
							className="px-3"
							bordered
							striped
							hover
						/>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductReviews;
