const express = require('express')
const router = express.Router();


const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview

} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/products').get(getProducts);//user view all products
router.route('/admin/products').get(getAdminProducts);//admin view all products
router.route('/product/:id').get(getSingleProduct);//user view single product

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);//admin add new product

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)//admin update existing product
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);//admin delete product


router.route('/review').put(isAuthenticatedUser, createProductReview)//user create product review
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)//user view all reviews
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)//user delete reviews

module.exports = router;