import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	getProductDetails,
	updateProduct,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = ({ match, history }) => {
	//define state variables and their corresponding update functions.
	// These variables hold the form input values.
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState(0);
	const [seller, setSeller] = useState("");
	const [color, setColor] = useState("");
	const [images, setImages] = useState([]);
	const [brand, setBrand] = useState("");

	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

	const categories = [
		"Tshirt",
		"Shirt",
		"Trouser",
		"Jacket",
		"Short",
		"Bag",
		"Accessories",
	];

	const sellers = ["Helanka Apparel", "Ranasinghe", "HexCo", "Gamini Apparel"];

	const alert = useAlert(); //display alerts or notifications to the user.
	const dispatch = useDispatch(); //dispatch actions to update the application's state.

	//extract the relevant pieces of state from the application's global state.
	const { error, product } = useSelector((state) => state.productDetails);
	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.product);

	const productId = match.params.id; //assigns it the value of the id parameter from the match object.

	useEffect(() => {
		if (product && product._id !== productId) {
			//checks if the product object exists and id property is not equal to productId
			dispatch(getProductDetails(productId)); //true-->retrieve the product details from the backend API.
		} else {
			// if the product object exists
			// set the component's state to the product's properties.
			setName(product.name);
			setPrice(product.price);
			setDescription(product.description);
			setCategory(product.category);
			setSeller(product.seller);
			setStock(product.stock);
			setOldImages(product.images);
			setColor(product.color);
			setBrand(product.brand);
		}

		if (error) {
			//checks---->Error
			alert.error(error); // displays an error message
			dispatch(clearErrors()); // remove the error from the state.
		}

		if (updateError) {
			//checks --->updateError
			alert.error(updateError); //displays an error message
			dispatch(clearErrors()); //remove the error from the state.
		}

		if (isUpdated) {
			//if updated
			history.goBack(); //navigates to the last page
			alert.success("Product updated successfully");
			dispatch({ type: UPDATE_PRODUCT_RESET }); //reset the isUpdated property in the state.
		}
	}, [
		dispatch,
		alert,
		error,
		isUpdated,
		history,
		updateError,
		product,
		productId,
	]);

	const submitHandler = (e) => {
		e.preventDefault(); //prevents the default form submission action from occurring.

		const formData = new FormData(); //FormData-->store and send data as key-value pairs.
		//sets a key-value pair on the formData
		formData.set("name", name);
		formData.set("price", price);
		formData.set("description", description);
		formData.set("category", category);
		formData.set("stock", stock);
		formData.set("seller", seller);
		formData.set("color", color);
		formData.set("brand", brand);

		images.forEach((image) => {
			formData.append("images", image);
		});

		dispatch(updateProduct(product._id, formData)); //update a product with the given _id and formData
	};

	const onChange = (e) => {
		const files = Array.from(e.target.files);

		//state to an empty array.
		setImagesPreview([]); //hold a preview of the images selected.
		setImages([]); //hold the actual image data that will be sent to the server.
		setOldImages([]); //hold the previous images that were associated with the product being updated.

		files.forEach((file) => {
			const reader = new FileReader(); //read the contents of a file.

			reader.onload = () => {
				//load event is fired when the file has finished loading.
				if (reader.readyState === 2) {
					//2==>file has been completely loaded.
					setImagesPreview((oldArray) => [...oldArray, reader.result]); //create a new array that combines the current oldArray with the reader.result
					setImages((oldArray) => [...oldArray, reader.result]); //create a new array that combines the current oldArray with the reader.result
				}
			};

			reader.readAsDataURL(file); //reading the contents of the file object as a data URL
		});
	};

	return (
		<Fragment>
			<MetaData title={"Update Product"} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<Fragment>
						<div className="wrapper my-5">
							<form
								className="shadow-lg"
								onSubmit={submitHandler}
								encType="multipart/form-data"
							>
								<h1 className="mb-4">Update Product</h1>

								<div className="form-group">
									<label htmlFor="name_field">Name</label>
									<input
										type="text"
										id="name_field"
										className="form-control"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="price_field">Price</label>
									<input
										type="text"
										id="price_field"
										className="form-control"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="brand_field">Brand</label>
									<input
										type="text"
										id="brand_field"
										className="form-control"
										value={brand}
										onChange={(e) => setBrand(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="color_field">Color</label>
									<input
										type="text"
										id="color_field"
										className="form-control"
										value={color}
										onChange={(e) => setColor(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="description_field">
										Description
									</label>
									<textarea
										className="form-control"
										id="description_field"
										rows="8"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									></textarea>
								</div>

								<div className="form-group">
									<label htmlFor="category_field">Category</label>
									<select
										className="form-control"
										id="category_field"
										value={category}
										onChange={(e) => setCategory(e.target.value)}
									>
										{categories.map((category) => (
											<option key={category} value={category}>
												{category}
											</option>
										))}
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="stock_field">Stock</label>
									<input
										type="number"
										id="stock_field"
										min="0"
										className="form-control"
										value={stock}
										onChange={(e) => setStock(e.target.value)}
									/>
								</div>

								{/*<div className="form-group">
									<label htmlFor="seller_field">Supplier</label>
									<input
										type="text"
										id="seller_field"
										className="form-control"
										value={seller}
										onChange={(e) => setSeller(e.target.value)}
									/>
										</div>*/}

								<div className="form-group">
									<label htmlFor="category_field">Supplier</label>
									<select
										className="form-control"
										id="seller_field"
										value={seller}
										onChange={(e) => setSeller(e.target.value)}
									>
										{sellers.map((seller) => (
											<option key={seller} value={seller}>
												{seller}
											</option>
										))}
									</select>
								</div>

								<div className="form-group">
									<label>Images</label>

									<div className="custom-file">
										<input
											type="file"
											name="product_images"
											accept=".png, .jpeg, .jpg, .webp"
											className="custom-file-input"
											id="customFile"
											onChange={onChange}
											multiple
										/>
										<label
											className="custom-file-label"
											htmlFor="customFile"
										>
											Choose Images
										</label>
									</div>

									{oldImages &&
										oldImages.map((img) => (
											<img
												key={img}
												src={img.url}
												alt={img.url}
												className="mt-3 mr-2"
												width="55"
												height="52"
											/>
										))}

									{imagesPreview.map((img) => (
										<img
											src={img}
											key={img}
											alt="Images Preview"
											className="mt-3 mr-2"
											width="55"
											height="52"
										/>
									))}
								</div>

								<button
									id="login_button"
									type="submit"
									className="btn btn-block py-3"
									disabled={loading ? true : false}
								>
									UPDATE
								</button>
							</form>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateProduct;
