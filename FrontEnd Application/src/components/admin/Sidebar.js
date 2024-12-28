import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className="sidebar-wrapper">
			<nav id="sidebar">
				<ul className="list-unstyled components">
					<li>
						<Link to="/dashboard">
							<i className="fa fa-tachometer"></i> Dashboard
						</Link>
					</li>

					<li>
						<a
							href="#productSubmenu"
							data-toggle="collapse"
							aria-expanded="false"
							className="dropdown-toggle"
						>
							<i className="fa fa-product-hunt"></i> Products
						</a>
						<ul className="collapse list-unstyled" id="productSubmenu">
							<li>
								<Link to="/admin/products">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/admin/product">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/admin/orders">
							<i className="fa fa-shopping-basket"></i> Orders
						</Link>
					</li>

					<li>
						<Link to="/admin/users">
							<i className="fa fa-users"></i> Customers
						</Link>
					</li>

					<li>
						<Link to="/admin/reviews">
							<i className="fa fa-star"></i> Reviews
						</Link>
					</li>

					{/* <li>
						<a
							href="#employeeSubmenu"
							data-toggle="collapse"
							aria-expanded="false"
							className="dropdown-toggle"
						>
							<i className="fa fa-id-card-o"></i> Employees
						</a>
						<ul className="collapse list-unstyled" id="employeeSubmenu">
							<li>
								<Link to="/admin/employees">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/admin/employee">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
						</ul>
	</li>*/}

					<li>
						<a
							href="#supplierSubmenu"
							data-toggle="collapse"
							aria-expanded="false"
							className="dropdown-toggle"
						>
							<i className="fa fa-truck"></i> Suppliers
						</a>
						<ul className="collapse list-unstyled" id="supplierSubmenu">
							<li>
								<Link to="/admin/suppliers">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/admin/supplier">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
						</ul>
					</li>

					<li>
						<a
							href="#deliverySubmenu"
							data-toggle="collapse"
							aria-expanded="false"
							className="dropdown-toggle"
						>
							<i className="fa fa-map-o"></i> Deliveries
						</a>
						<ul className="collapse list-unstyled" id="deliverySubmenu">
							<li>
								<Link to="/admin/deliveries">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/admin/delivery">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/admin/analysis">
							<i className="fa fa-line-chart"></i> Analysis
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
