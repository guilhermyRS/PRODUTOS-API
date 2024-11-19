const Cart = require('../models/cart.js');
const Product = require('../models/product.js');

class CartController {
    constructor() {
        // Métodos
        this.addToCart = this.addToCart.bind(this);
        this.viewCart = this.viewCart.bind(this);
        this.checkout = this.checkout.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this); // Novo método para remover item
    }

    // Método para adicionar um produto ao carrinho
    addToCart(req, res) {
        const productId = req.body.productId;
        const quantity = req.body.quantity || 1;

        Cart.add(productId, quantity, (err) => {
            if (err) {
                res.status(500).send("Error adding to cart");
            } else {
                res.redirect('/cart');
            }
        });
    }

    // Método para visualizar os itens do carrinho
    viewCart(req, res) {
        Cart.all((err, cartItems) => {
            if (err) {
                res.status(500).send("Error retrieving cart items");
            } else {
                // Para cada item no carrinho, busca o produto correspondente
                const productDetailsPromises = cartItems.map(item => {
                    return new Promise((resolve, reject) => {
                        Product.findById(item.productId, (err, product) => {
                            if (err) return reject(err);
                            resolve({
                                ...item,
                                ...product // Adiciona as informações do produto no item do carrinho
                            });
                        });
                    });
                });

                // Espera todos os produtos serem recuperados e renderiza a view
                Promise.all(productDetailsPromises)
                    .then(cartItemsWithDetails => {
                        res.render('cart', {
                            cartItems: cartItemsWithDetails
                        });
                    })
                    .catch(error => {
                        res.status(500).send("Error retrieving product details for cart");
                    });
            }
        });
    }

    // Método para realizar o checkout
    checkout(req, res) {
        Cart.total((err, total) => {
            if (err) {
                res.status(500).send("Error calculating total");
            } else {
                res.render('checkout', {
                    total
                });
            }
        });
    }

    // Método para remover um produto do carrinho
    removeFromCart(req, res) {
        console.log("Requisição para remover produto:", req.body.productId);
        const productId = req.body.productId;

        Cart.remove(productId, (err) => {
            if (err) {
                res.status(500).send("Error removing item from cart");
            } else {
                res.redirect('/cart');
            }
        });
    }

}

module.exports = new CartController();