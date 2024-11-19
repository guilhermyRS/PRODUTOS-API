const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const Product = require('../models/product');  // Verifique se o caminho está correto


class AdminController {
    static dashboard(req, res) {
        adminController.dashboard(req, res);
    }

    static createProduct(req, res, next) {
        adminController.createProduct(req, res, next);
    }

    static createProductHandler(req, res) {
        adminController.createProductHandler(req, res);
    }

    static editProductHandler(req, res) {
        adminController.editProductHandler(req, res);
    }

    static deleteProductHandler(req, res) {
        adminController.deleteProductHandler(req, res);
    }
}

router.get('/admin', AdminController.dashboard);
router.post('/admin/create', AdminController.createProduct, AdminController.createProductHandler);
router.get('/admin/edit/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err || !product) {
            res.status(404).send("Product not found");
        } else {
            res.render('editProduct', { product });
        }
    });
});
router.post('/admin/edit/:id', AdminController.createProduct, AdminController.editProductHandler);
router.post('/admin/delete/:id', AdminController.deleteProductHandler);

module.exports = router;
