const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(productRoutes);
app.use(cartRoutes);
app.use(adminRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
