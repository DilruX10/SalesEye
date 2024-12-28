const express = require("express");
const router = express.Router();

const {
	newDelivery,
	getAdminDeliveries,
	deleteDelivery,
	getSingleDelivery,
	updateDelivery,
} = require("../controllers/deliveryController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/deliveries").get(getAdminDeliveries);

router
	.route("/admin/delivery/new")
	.post(isAuthenticatedUser, authorizeRoles("admin"), newDelivery);

router
	.route("/admin/delivery/:id")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getSingleDelivery)
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateDelivery) //admin
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDelivery);

module.exports = router;
