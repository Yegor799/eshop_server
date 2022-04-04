const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();


require('dotenv/config');

const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler)

const api = process.env.API_URL;

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connection is ready')
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(3000, () => {
    console.log('server is running http://localhost:3000');
})

//начал 7 008