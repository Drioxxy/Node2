const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const Swal = require('sweetalert');

const app = express();

//importando rutas

const customerRoutes = require('./routes/customer');

//settings express
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views', path.join (__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
        host: 'localhost',
        user: 'root',
        password: '12345',
        port: 3306,
        database: 'crudnodejsmysql'
    }, 'single')); 

app.use(express.urlencoded({extended: false}));

//routes
app.use('/',customerRoutes);

// static files
app.use (express.static(path.join(__dirname, 'public')));

// Iniciando el servidor
app.listen(app.get('port'), () =>{
    console.log('Escuchando en el servidor puerto 3000');
});