import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Footerstyle.css";

const Footer = () => {
	return (
		<Fragment>
			<footer class="footer">
				{/* About Company */}
				<div class="footer-left col-md-4 col-sm-6">
					<p class="about">
						<Link to="/">
							<img
								src="/images/shopit_logo.png"
								width="300"
								height="auto"
							/>
						</Link>
						<br />
						<br />
						Ut congue augue non tellus bibendum, in varius tellus
						condimentum. In scelerisque nibh tortor, sed rhoncus odio
						condimentum in. Sed sed est ut sapien ultrices eleifend.
						Integer tellus est, vehicula eu lectus tincidunt, ultricies
						feugiat leo. Suspendisse tellus elit, pharetra in hendrerit
						ut, aliquam quis augue. Nam ut nibh mollis, tristique ante
						sed, viverra massa.
					</p>
				</div>

				{/* Useful Links */}
				<div class="footer-center col-md-5 col-sm-6">
					<center>
						<h3> Useful Links </h3>
						<br />
						<p class="menu float-middle">
							<li>
								<a href="#"> Home</a>
							</li>
							<li>
								<a href="#"> Store</a>
							</li>
							<li>
								<a href="#"> About</a>
							</li>
							<li>
								<a href="#"> Service</a>
							</li>
							<li>
								<a href="#"> Contact</a>
							</li>
						</p>
					</center>
				</div>

				{/* Contact details */}
				<div class="footer-right col-md-3 col-sm-6 float-right">
					<h3> Contact Details </h3>
					<br />
					<div>
						<p>
							<i class="fa fa-map-marker"></i> No. 10, Malabe, Colombo
						</p>
						<p>
							<i class="fa fa-phone"></i> (+94)11-2451789
						</p>
						<p>
							<i class="fa fa-envelope"></i>{" "}
							<a href="#"> office@salesvision.com</a>
						</p>
					</div>
					<div class="icons">
						<a href="#">
							<i class="fa fa-facebook"></i>
						</a>
						{"   "}
						<a href="#">
							<i class="fa fa-twitter"></i>
						</a>
						{"   "}
						<a href="#">
							<i class="fa fa-linkedin"></i>
						</a>
						{"   "}
						<a href="#">
							<i class="fa fa-google-plus"></i>
						</a>
						{"   "}
						<a href="#">
							<i class="fa fa-instagram"></i>
						</a>
					</div>
				</div>
			</footer>
		</Fragment>
	);
};

export default Footer;
