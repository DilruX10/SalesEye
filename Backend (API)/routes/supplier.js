const express = require("express");
const router = express.Router();

const {
	newSupplier,
	getAdminSuppliers,
	deleteSupplier,
	updateSupplier,
	getSingleSupplier,
} = require("../controllers/supplierController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/suppliers").get(getAdminSuppliers);
router.route("/supplier/:id").get(getSingleSupplier); //user view single supplier

router
	.route("/admin/supplier/new")
	.post(isAuthenticatedUser, authorizeRoles("admin"), newSupplier);

router
	.route("/admin/supplier/:id")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getSingleSupplier)
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateSupplier)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSupplier);

module.exports = router;
