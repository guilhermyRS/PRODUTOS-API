const db = require('../database/db');

class Cart {
    constructor() {
        // Métodos
        this.all = this.all.bind(this);
        this.add = this.add.bind(this);
        this.total = this.total.bind(this);
        this.remove = this.remove.bind(this); // Novo método para remover item
    }

    // Método para buscar todos os itens no carrinho
    all(callback) {
        db.all('SELECT * FROM cart', (err, rows) => {
            callback(err, rows);
        });
    }

    // Método para adicionar ou atualizar a quantidade de um item no carrinho
    add(productId, quantity, callback) {
        // Verifica se o produto já existe no carrinho
        db.get('SELECT * FROM cart WHERE productId = ?', [productId], (err, row) => {
            if (err) return callback(err);

            if (row) {
                // Se já existir, atualiza a quantidade
                db.run('UPDATE cart SET quantity = quantity + ? WHERE productId = ?', [quantity, productId], function (err) {
                    callback(err, this.changes);
                });
            } else {
                // Se não existir, adiciona um novo item
                db.run('INSERT INTO cart (productId, quantity) VALUES (?, ?)', [productId, quantity], function (err) {
                    callback(err, this.lastID);
                });
            }
        });
    }

    // Método para remover um item do carrinho
    // Método para remover um item do carrinho
    remove(productId, callback) {
        db.run('DELETE FROM cart WHERE productId = ?', [productId], function (err) {
            callback(err);
        });
    }


    // Método para calcular o total do carrinho
    total(callback) {
        db.all('SELECT p.price, c.quantity FROM cart c JOIN products p ON c.productId = p.id', (err, rows) => {
            let total = 0;
            rows.forEach(row => {
                total += row.price * row.quantity;
            });
            callback(err, total);
        });
    }
}

module.exports = new Cart();