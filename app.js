import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

//Base de datos
const mongoose = require('mongoose');
// const uri = 'mongodb://localhost:27017/vue-db';
const uri = 'mongodb+srv://admin:emG8CRbXOxvDFZ9P@cluster0-3fgno.gcp.mongodb.net/vue-app?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

mongoose.connect(uri, options).then(
    () => { console.log('Conectado a DB') },
    err => { console.log(err) }
);
// emG8CRbXOxvDFZ9P
// mongodb + srv: //admin:<password>@cluster0-3fgno.gcp.mongodb.net/test?retryWrites=true&w=majority

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api', require('./routes/nota'));

//app.get('/', (req, res) => {
//    res.send('Hello World!');
//});

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
    console.log('Example app listening on port' + app.get('puerto'));
});