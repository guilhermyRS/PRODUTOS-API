const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController.js');

class CartController {
    static addToCart(req, res) {
        cartController.addToCart(req, res);
    }

    static viewCart(req, res) {
        cartController.viewCart(req, res);
    }

    static checkout(req, res) {
        cartController.checkout(req, res);
    }
}

router.post('/add-to-cart', cartController.addToCart);
router.post('/remove-from-cart', cartController.removeFromCart);

router.get('/cart', cartController.viewCart);
router.get('/checkout', cartController.checkout);



module.exports = router;
