
/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias


const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos

const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

app.get('/', function(req, res)
{
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('login', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});




app.post('/login', async function(req, res)
{
    let usuarios= await MySQL.realizarQuery("SELECT * FROM Usuarios")
    for (let i in usuarios){
        if(usuarios[i].nom_usuario==req.body.nom_usuario){
            if (req.body.contraseña==usuarios[i].contraseña){
                
                res.render('home', { mensaje: "Hola mundo!", usuario: req.body.nom_usuario});
            } 
        }
    }
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body); 
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    res.render('login', null); //Renderizo página "home" enviando un objeto de 2 parámetros a Handlebars
    //res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});
app.post('/Admin', async function(req, res){
    console.log("Soy un pedido POST", req.query);
    res.render('Admin', null);
    /*
    console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
    let vector = [await MySQL.realizarQuery(` SELECT * FROM Palabras `)]
    console.log(vector)
    if (vector.length > 0) {
        res.send({palabra: vector})    
    }
    else{
        res.send({palabra:false})    
    }*/
});

app.get('/Admin', async function(req, res){
    console.log("Soy un pedido GET", req.query);
    res.render('Admin', null);

});

app.put('/login', async function(req, res) {
    //Petición PUT con URL = "/login"
    console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
    let respuesta= await MySQL.realizarQuery(` SELECT * FROM Usuarios WHERE nom_usuario= "${req.body.user}" AND contraseña = "${req.body.pass}"`)

    if (respuesta.length > 0) {
        res.send({validar: true, esadmin:respuesta[0].esadmin})    
    }
    else{
        res.send({validar:false})    
    }
});

app.put('/Admin', async function(req, res) {
    //Petición PUT con URL = "/login"
    console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
    let vector = [await MySQL.realizarQuery(` SELECT * FROM Palabras `)]
    let vector2 = [await MySQL.realizarQuery(` SELECT nom_usuario FROM Usuarios `)]
    console.log(vector)
    console.log(vector2)
    if (vector.length > 0) {
        res.send({palabras: vector, usuarios: vector2})    
    }
    else{
        res.send({palabras:false})    
    }
});

app.delete('/login', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.send(null);
});
app.get('/registrarse', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('Registro', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});
app.post('/nuevousuario', async function(req, res)
{
    let validar = true
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body); 
    let users= await MySQL.realizarQuery("SELECT * FROM Usuarios")
    for (let i in users){
        if (req.body.nom_usuario == users[i].nom_usuario){
            validar = false
        }
    }
    if (validar==true) {
        await MySQL.realizarQuery (`INSERT INTO Usuarios VALUES("${req.body.mail}", "${req.body.nom_usuario}", "${req.body.contraseña}",${false})`)    
        res.render('home', { mensaje: "Hola mundo!", usuario: req.body.nom_usuario}); //Renderizo página "home" enviando un objeto de 2 parámetros a Handlebars
    }
    else if (validar==false){
        res.render("Registro",{mensaje: "Usuario ya existente"})
    }
    
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    
    //res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});
app.get('/reiniciar', async function(req, res){
    console.log("Soy un pedido GET", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
})

app.post('/randomWord', async function(req, res){
    console.log("Soy un pedido POST", req.body);
    let palabra= await MySQL.realizarQuery("SELECT palabras FROM Palabras")
    var indiceAleatorio = Math.floor(Math.random() * palabra.length)
    var palabraAleatoria = palabra[indiceAleatorio]
    res.send({word: palabraAleatoria})

});

app.put('/eliminar', async function(req, res){

    let validar = true
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body); 
    let palabras= await MySQL.realizarQuery("SELECT * FROM Palabras")
    let entre = false
    console.log(req.body.pregunta)
    for (let i in palabras){
        if (palabras[i].palabras == req.body.pregunta){
            entre = true
            respuesta = await MySQL.realizarQuery(`DELETE FROM Palabras WHERE palabras = "${req.body.pregunta}";`)

            res.send({validar: true})    
            
            
        }
    }
    if (entre == false) {
        res.send({validar:false})    
    }
    
});

app.put('/agregar', async function(req, res){
    let validar = true
    console.log("Soy un pedido PUT agregar", req.body);
    let palabras= await MySQL.realizarQuery("SELECT * FROM Palabras")
    for (let i in palabras){
        if (palabras[i].palabras == req.body.pregunta){
            validar = false
            res.send({validar: false});
        }
       
    }
    if (validar == true){
        sumar = await MySQL.realizarQuery (`INSERT INTO Palabras VALUES("${req.body.pregunta}")`)    
        
        res.send({validar: true});

    }
});

app.put('/eliminarUsuario', async function(req, res){

    let validar = true
    //Petición POST con URL = "/login"
    console.log("Soy un pedido PUT", req.body); 
    let usuarios= await MySQL.realizarQuery("SELECT * FROM Usuarios")
    let entre = false
    console.log(req.body.pregunta)
    for (let i in usuarios){
        if (usuarios[i].nom_usuario == req.body.pregunta){
            entre = true
            respuesta = await MySQL.realizarQuery(`DELETE FROM Usuarios WHERE nom_usuario = "${req.body.pregunta}";`)

            res.send({validar: true})    
            
            
        }
    }
    if (entre == false) {
        res.send({validar:false})    
    }
    
});