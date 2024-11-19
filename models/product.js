const db = require('../database/db');

class Product {
    constructor() {
        // Métodos
        this.all = this.all.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // Método para buscar todos os produtos
    all(callback) {
        db.all('SELECT * FROM products', (err, rows) => {
            callback(err, rows);
        });
    }

    // Método para buscar um produto pelo ID
    findById(id, callback) {
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    }

    // Método para criar um novo produto
    create(product, callback) {
        const { name, description, price, image, freeShipping } = product;
        db.run('INSERT INTO products (name, description, price, image, freeShipping) VALUES (?, ?, ?, ?, ?)', 
        [name, description, price, image, freeShipping], function (err) {
            callback(err, this.lastID);
        });
    }

    // Método para atualizar um produto
    update(id, product, callback) {
        const { name, description, price, image, freeShipping } = product;
        db.run('UPDATE products SET name = ?, description = ?, price = ?, image = ?, freeShipping = ? WHERE id = ?', 
        [name, description, price, image, freeShipping, id], function(err) {
            callback(err, this.changes);
        });
    }

    // Método para excluir um produto
    delete(id, callback) {
        db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
            callback(err, this.changes);
        });
    }
}

module.exports = new Product();
