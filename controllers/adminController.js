const Product = require('../models/product.js');
const multer = require('multer');
const path = require('path');

class AdminController {
    constructor() {
        // Configuração do multer para upload de imagens
        this.upload = multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, './public/images');
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + path.extname(file.originalname));
                }
            })
        });

        // Métodos
        this.dashboard = this.dashboard.bind(this);
        this.createProductHandler = this.createProductHandler.bind(this);
        this.editProductHandler = this.editProductHandler.bind(this);
        this.deleteProductHandler = this.deleteProductHandler.bind(this);
    }

    // Método para exibir o painel de administração com produtos
    dashboard(req, res) {
        Product.all((err, products) => {
            if (err) {
                res.status(500).send("Error retrieving products");
            } else {
                res.render('adminDashboard', { products });
            }
        });
    }

    // Middleware para upload de imagem
    createProduct(req, res, next) {
        this.upload.single('image')(req, res, next);
    }

    // Método para criar um novo produto
    createProductHandler(req, res) {
        const { name, description, price, freeShipping } = req.body;
        const image = req.file ? '/images/' + req.file.filename : null;

        Product.create({ name, description, price, image, freeShipping: freeShipping === 'on' }, (err, productId) => {
            if (err) {
                res.status(500).send("Error creating product");
            } else {
                res.redirect('/admin');
            }
        });
    }

    // Método para editar um produto
    editProductHandler(req, res) {
        const id = req.params.id;
        const { name, description, price, freeShipping } = req.body;
        const image = req.file ? '/images/' + req.file.filename : req.body.image;  // Mantém a imagem existente, se não for carregada nova

        Product.update(id, { name, description, price, image, freeShipping: freeShipping === 'on' }, (err, changes) => {
            if (err) {
                res.status(500).send("Error updating product");
            } else {
                res.redirect('/admin');
            }
        });
    }

    // Método para excluir um produto
    deleteProductHandler(req, res) {
        const id = req.params.id;
        Product.delete(id, (err, changes) => {
            if (err) {
                res.status(500).send("Error deleting product");
            } else {
                res.redirect('/admin');
            }
        });
    }
}

module.exports = new AdminController();
