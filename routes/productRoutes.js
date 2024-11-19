const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

class ProductController {
    static home(req, res) {
        productController.home(req, res);
    }

    static detail(req, res) {
        productController.detail(req, res);
    }
}

router.get('/', ProductController.home);
router.get('/product/:id', ProductController.detail);

module.exports = router;
