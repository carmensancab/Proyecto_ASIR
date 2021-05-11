const  express = require('express');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    res.render('index.html', {title: 'Pagina Principal'});
 })

 ruta.get('/contacto', (req, res) => {
    res.render('contacto.html', {title: 'Pagina de Contacto'});
 })
 ruta.get('/aboutus', (req, res) => {
    res.render('aboutus.html', {title: 'Sobre nosotros'});
 })
 module.exports = ruta;