const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//conexion a la base de datos
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
 	console.log("connected are your database: "+config.database);
});
//muesta los errores, si hay, al conectar la base de datos
mongoose.connection.on('error',(err)=>{
 	console.log("error in your database: "+err);
});

//instanciamos a la variable app la funcion express
const app = express();

//instanciamos el archivo users a la variable para poder acceder a las rutas a traves de la url
const users = require('./routes/users');

const port = 3000;

//cors middleware
app.use(cors());

//index de la app
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//index router
app.get('/', (req, res)=>{
	res.send('Invalid Endpoint');
});

//start server
app.listen(port, ()=>{
	console.log('server runner on port '+ port); 	
});