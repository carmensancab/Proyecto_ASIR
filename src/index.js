const  express = require('express');
const app = express();
const path = require('path');

//Configuraciones

// Seleccionar en que puerto quiero que se ejecute el servidor web
app.set('port', 5000);
//
app.set('views', path.join(__dirname, 'views'));
//Poder poner scripts en la pagina index.html
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs')


//rutas alas diferentes paginas web
app.use(require('./rutas/index'));

// Estaticos
app.use(express.static(path.join(__dirname, 'public')));

// En que puerto arranca el servidor web
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});

