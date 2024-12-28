import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newProduct } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({ history }) => {
	//history--->previously type things on form

	//store various input values---->
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState(0);
	const [seller, setSeller] = useState("");
	const [color, setColor] = useState("");
	const [brand, setBrand] = useState("");
	const [images, setImages] = useState([]); //store---> actual image data
	const [imagesPreview, setImagesPreview] = useState([]); //store--->previews of images

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

	const alert = useAlert(); //display alerts to the user
	const dispatch = useDispatch();

	const { loading, error, success } = useSelector((state) => state.newProduct);

	useEffect(() => {
		// handle the changes in the component's state

		if (error) {
			//if there is an error
			alert.error(error); //display error
			dispatch(clearErrors()); //clears the errors from the Redux store
		}

		if (success) {
			//if action is success
			history.push("/admin/products"); //push to admin-->product
			alert.success("Product created successfully"); //success alert
			dispatch({ type: NEW_PRODUCT_RESET }); //resets the newProduct slice
		}
	}, [dispatch, alert, error, success, history]);

	const submitHandler = (e) => {
		//executed when the user submits the new product form
		e.preventDefault(); //prevents the default form submission behavior
		//because we want to handle the form submission ourselves with custom code.

		const formData = new FormData(); //construct a set of key/value pairs representing form fields and their values.
		//hold a value entered by the user into the relevant form field
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
		}); //add(append) the image data to the form data under the key 'images'

		dispatch(newProduct(formData));
	};

	const onChange = (e) => {
		//when the user selects one or more files in an input field.----->images

		const files = Array.from(e.target.files); // creates a new array of files

		//empty arrays clear any previously selected images from the state.
		setImagesPreview([]);
		setImages([]);

		files.forEach((file) => {
			const reader = new FileReader(); //Create a new instance

			reader.onload = () => {
				//called when the file has been loaded into memory.
				if (reader.readyState === 2) {
					//indicating that the file has been completely loaded

					//imagesPreview----->hold a preview of the selected images,
					//images--->hold the actual image data that will be submitted to the server.

					//update the state variables with new image data
					//spread operator (...) ----> create a new array that combines the old array with the new image data.
					setImagesPreview((oldArray) => [...oldArray, reader.result]);
					setImages((oldArray) => [...oldArray, reader.result]);
				}
			};

			reader.readAsDataURL(file); //Read the contents of the file as a data URL
		});
	};

	return (
		<Fragment>
			<MetaData title={"New Product"} />
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
								<h1 className="mb-4">New Product</h1>

								<div className="form-group">
									<label htmlFor="name_field">Name</label>
									<input
										type="text"
										id="name_field"
										pattern="^[a-zA-Z].{9,}$"
										title="Product name should start with a letter and contain 10 or more characters"
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
										min="0"
										pattern="[0-9]*[.]?[0-9]{0,2}"
										title="Price can only contain up to 2 decimal places (e.g. - 99.99)"
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
										pattern="^[a-zA-Z0-9 ]+$"
										title="Brand can only contain alphanumeric characters and spaces"
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
										className="form-control"
										min="0"
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
											accept=".png, .jpeg, .jpg, .webp"
											name="product_images"
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
									CREATE
								</button>
							</form>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default NewProduct;
