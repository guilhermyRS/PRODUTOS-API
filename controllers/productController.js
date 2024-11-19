const Product = require('../models/product.js');

class ProductController {
    constructor() {
        // Métodos
        this.home = this.home.bind(this);
        this.detail = this.detail.bind(this);
    }

    // Método para exibir a página inicial com todos os produtos
    home(req, res) {
        Product.all((err, products) => {
            if (err) {
                res.status(500).send("Error retrieving products");
            } else {
                res.render('home', { products });
            }
        });
    }

    // Método para exibir os detalhes de um produto
    detail(req, res) {
        const productId = req.params.id;
        Product.findById(productId, (err, product) => {
            if (err || !product) {
                res.status(404).send("Product not found");
            } else {
                res.render('productDetail', { product });
            }
        });
    }
}

module.exports = new ProductController();
