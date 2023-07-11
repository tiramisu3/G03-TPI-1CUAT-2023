
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
    console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
    let vector = [await MySQL.realizarQuery(` SELECT * FROM Palabras `)]
    console.log(vector)
    if (vector.length > 0) {
        res.send({palabra: true})    
    }
    else{
        res.send({palabra:false})    
    }
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
    console.log(vector)
    if (vector.length > 0) {
        res.send({palabra: true})    
    }
    else{
        res.send({palabra:false})    
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
app.post('/home', async function(req, res){
    
})

app.post('/home', async function(req, res){
    console.log("Soy un pedido POST", req.body);
    let palabra= await MySQL.realizarQuery("SELECT palabras FROM Palabras")
    var indiceAleatorio = Math.floor(Math.random() * palabra.length)
    var palabraAleatoria = palabra[indiceAleatorio]
    let word = palabraAleatoria.split("")
    const intentos = 5
    let letter1 = document.getElementById("txt1").value;
    let letter2 = document.getElementById("txt2").value;
    let letter3 = document.getElementById("txt3").value;
    let letter4 = document.getElementById("txt4").value;
    let letter5 = document.getElementById("txt5").value;
    let word1 = letter1 +  letter2 + letter3 + letter4 + letter5;
    let letter6 = document.getElementById("txt6").value;
    let letter7 = document.getElementById("txt7").value;
    let letter8 = document.getElementById("txt8").value;
    let letter9 = document.getElementById("txt9").value;
    let letter10 = document.getElementById("txt10").value;
    let word2 = letter6 +  letter7 + letter8 + letter9 + letter10;
    let letter11 = document.getElementById("txt11").value;
    let letter12 = document.getElementById("txt12").value;
    let letter13 = document.getElementById("txt13").value;
    let letter14 = document.getElementById("txt14").value;
    let letter15 = document.getElementById("txt15").value;
    let word3 = letter11 +  letter12 + letter13 + letter14 + letter15;
    let letter16 = document.getElementById("txt16").value;
    let letter17 = document.getElementById("txt17").value;
    let letter18 = document.getElementById("txt18").value;
    let letter19 = document.getElementById("txt19").value;
    let letter20 = document.getElementById("txt20").value;
    let word4 = letter16 +  letter17 + letter18 + letter19 + letter20;
    let letter21 = document.getElementById("txt21").value;
    let letter22 = document.getElementById("txt22").value;
    let letter23 = document.getElementById("txt23").value;
    let letter24 = document.getElementById("txt24").value;
    let letter25 = document.getElementById("txt25").value;
    let word5 = letter21 +  letter22 + letter23 + letter24 + letter25;
    if (palabraAleatoria == word1 || palabraAleatoria == word2 || palabraAleatoria == word3 || palabraAleatoria == word4 || palabraAleatoria == word5){
        ganaste()
    }
    for (let i in word){
        
    }
});
