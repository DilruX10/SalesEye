import { countries } from "countries-list";
import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";

const Shipping = ({ history }) => {
	const countriesList = Object.values(countries);
	const cityList = [  "Ahangama",
	"Akmeemana",
	"Akuressa",
	"Alawwa",
	"Ambalangoda",
	"Ambalantota",
	"Ampara",
	"Anamaduwa",
	"Angunakolapelessa",
	"Anuradhapura",
	"Badulla",
	"Balangoda",
	"Bandarawela",
	"Batticaloa",
	"Beliatta",
	"Beruwala",
	"Bibile",
	"Chavakachcheri",
	"Chilaw",
	"Colombo",
	"Dambulla",
	"Dehiattakandiya",
	"Dekatana",
	"Deniyaya",
	"Dickwella",
	"Dikwella",
	"Dambadeniya",
	"Divulapitiya",
	"Eheliyagoda",
	"Embilipitiya",
	"Eravur",
	"Galagedara",
	"Galle",
	"Gampaha",
	"Gampola",
	"Gelioya",
	"Ginigathhena",
	"Godagama",
	"Hambantota",
	"Haputale",
	"Hatton",
	"Hikkaduwa",
	"Horana",
	"Ingiriya",
	"Ja-Ela",
	"Jaffna",
	"Kadugannawa",
	"Kaduwela",
	"Kalmunai",
	"Kalpitiya",
	"Kalutara",
	"Kandy",
	"Kataragama",
	"Katunayaka",
	"Kegalle",
	"Kelaniya",
	"Kilinochchi",
	"Kiribathgoda",
	"Kolonnawa",
	"Kotagala",
	"Kotte",
	"Kuliyapitiya",
	"Kurunegala",
	"Mahanuwara",
	"Malabe",
	"Mannar",
	"Matale",
	"Matara",
	"Mawanella",
	"Minuwangoda",
	"Monaragala",
	"Moratuwa",
	"Mullaitivu",
	"Nawalapitiya",
	"Negombo",
	"Nittambuwa",
	"Nugegoda",
	"Nuwara Eliya",
	"Padukka",
	"Panadura",
	"Peliyagoda",
	"Point Pedro",
	"Polonnaruwa",
	"Puttalam",
	"Ratnapura",
	"Rikillagaskada",
	"Seethawakapura",
	"Sigiriya",
	"Talawakele",
	"Tangalle",
	"Trincomalee",
	"Valvedditturai",
	"Vavuniya",
	"Wadduwa",
	"Wattala",
	"Weligama",
	"Wellawaya",
	"Wattegama",
	"Weligama",
	"Wennappuwa",
	"Yatiyantota",];

	const { shippingInfo } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingInfo.address);
	const [city, setCity] = useState(shippingInfo.city);
	const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
	const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
	const [country, setCountry] = useState(shippingInfo.country);

	// State for phone number validation error
	const [phoneError, setPhoneError] = useState("");

	// State for city suggestions
	const [citySuggestions, setCitySuggestions] = useState([]);

	const dispatch = useDispatch();

	// Function to validate phone number format
	const validatePhoneNumber = (phoneNumber) => {
		const phoneRegex = /^[0-9]{10}$/; // Customize the regex pattern as needed
		return phoneRegex.test(phoneNumber);
	  };

	const submitHandler = (e) => {
		e.preventDefault();

		// Validate phone number before submitting
		if (!validatePhoneNumber(phoneNo)) {
			setPhoneError("Please enter a valid phone number.");
			return; // Don't submit if phone number is invalid
		  }

		dispatch(
			saveShippingInfo({ address, city, phoneNo, postalCode, country })
		);
		history.push("/confirm");
	};

	// Clear phone error when phone number changes
	useEffect(() => {
		setPhoneError("");
	  }, [phoneNo]);

	  // Function to handle city input change and update suggestions
  const handleCityInputChange = (e) => {
    const userInput = e.target.value;
    const filteredSuggestions = cityList.filter((city) =>
      city.toLowerCase().includes(userInput.toLowerCase())
    );
    setCity(userInput);
    setCitySuggestions(filteredSuggestions);
  };

  // Function to handle suggestion click and update city input
  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setCitySuggestions([]);
  };
	  
	return (
		<Fragment>
			<MetaData title={"Shipping Info"} />

			<CheckoutSteps shipping />

			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form className="shadow-lg" onSubmit={submitHandler}>
						<h1 className="mb-4">Shipping Info</h1>
						<div className="form-group">
							<label htmlFor="address_field">Address</label>
							<input
								type="text"
								id="address_field"
								className="form-control"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="city_field">City</label>
							<input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={handleCityInputChange} // Handle input change
                required
              />
				{/* Suggestions dropdown */}
				{citySuggestions.length > 0 && (
                <ul className="suggestions">
                  {citySuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
						</div>

						<div className="form-group">
							<label htmlFor="postal_code_field">Postal Code</label>
							<input
								type="number"
								id="postal_code_field"
								className="form-control"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								required
							/>
						</div>

						<div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={() => setCountry("Sri Lanka")}
                required
              >
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

						<div className="form-group">
							<label htmlFor="phone_field">Phone No</label>
							<input
								type="phone"
								id="phone_field"
								className={`form-control ${phoneError ? "is-invalid" : ""}`}
								value={phoneNo}
								onChange={(e) => setPhoneNo(e.target.value)}
								required
							/>
							{phoneError && (
                				<div className="invalid-feedback">{phoneError}</div>
              				)}
						</div>

						<button
							id="shipping_btn"
							type="submit"
							className="btn btn-block py-2"
						>
							CONTINUE
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Shipping;
