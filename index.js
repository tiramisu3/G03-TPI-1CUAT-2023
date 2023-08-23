
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

mailLogueado= ""


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
        mailLogueado = respuesta[0].mail
        console.log(mailLogueado)
    
    }
    else{
        res.send({validar:false})    
    }
});

app.put('/Admin', async function(req, res) {
    //Petición PUT con URL = "/login"
    console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
    let vector = [await MySQL.realizarQuery(` SELECT * FROM Palabras `)]
    let vector2 = [await MySQL.realizarQuery(` SELECT * FROM Usuarios `)]
    console.log(vector)
    console.log(vector2)
    if (vector.length > 0) {
        res.send({palabras: vector, usuarios: vector2})    
    }
    else{
        res.send({palabras:false})    
    }
});


app.get('/registrarse', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('Registro', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});
app.post('/nuevoUsuario', async function(req, res)
{
    let validar = true
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body); 
    let users= await MySQL.realizarQuery("SELECT * FROM Usuarios")
    for (let i in users){
        if (req.body.mail == users[i].mail){
            validar = false
        }
    }
    if (validar==true) {
        await MySQL.realizarQuery (`INSERT INTO Usuarios VALUES("${req.body.mail}", "${req.body.nom_usuario}", "${req.body.contraseña}",${false},${0})`) 
        mailLogueado = req.body.mail
        console.log(mailLogueado)   
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
    console.log("Soy un pedido PUT", req.body); 
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

app.put('/eliminarPuntaje', async function(req, res){

    let validar = true
    console.log("Soy un pedido PUT", req.body); 
    let usuarios= await MySQL.realizarQuery("SELECT * FROM Usuarios")
    let entre = false
    console.log(req.body.pregunta)
    console.log("hi")
    for (let i in usuarios){
        console.log("hola") 
        if (usuarios[i].nom_usuario == req.body.pregunta){
            console.log("hola2")
            entre = true
            respuesta = await MySQL.realizarQuery(`UPDATE Usuarios SET puntaje = ${0} WHERE nom_usuario="${req.body.pregunta}";`);
            let usuario = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE mail = "${req.body.pregunta}"`)// traer el puntajer del usuario logeado
            console.log(usuario)
            res.send({validar: true})    
            
            
        }
    }
    if (entre == false) {
        res.send({validar:false})    
    }
    
});

app.get('/home', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido GET", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.render('home', null)
    ;
});

app.get('/volver', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido GET", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.render('login', null)
    ;
});

app.get('/jugardenuevo', function(req, res) {
    //Petición DELETE con URL = "/login"
    console.log("Soy un pedido GET", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.render('home', null)
    ;
});

app.put('/cambiarPalabra', async function(req, res) {
    console.log("Soy un pedido PUT", req.body);
    let validar = true
    let palabras= await MySQL.realizarQuery("SELECT * FROM Palabras")
    let entre = false
    console.log(req.body.borrar)
    for (let i in palabras){
        if (palabras[i].palabras == req.body.borrar){
            entre = true
            respuesta = await MySQL.realizarQuery(`DELETE FROM Palabras WHERE palabras = "${req.body.borrar}";`)
            for (let i in palabras){
                if (palabras[i].palabras == req.body.agregar){
                    validar = false
                    res.send({validar: false});
                }
               
            }
            if (validar == true){
                sumar = await MySQL.realizarQuery (`INSERT INTO Palabras VALUES("${req.body.agregar}")`)    
                
                res.send({validar: true});
        
            }
                
            
            
        }
    }
    if (entre == false) {
        res.send({validar:false})    
    }
    

});

app.post('/tabla', async function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido POST", req.query); 
    let usuarios= await MySQL.realizarQuery("SELECT * FROM Usuarios")
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('Tablas', {usuario:usuarios});
});

app.put('/agregarPuntos', async function(req, res){
    console.log("Soy un pedido PUT /agregarPuntos", req.query);
    validar = true
    console.log(mailLogueado)
    let usuario = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE mail = "${mailLogueado}"`)// traer el puntajer del usuario logeado
    console.log(usuario[0].puntaje)
    usuario[0].puntaje = usuario[0].puntaje + req.body.masPuntaje 
    console.log(usuario[0])
    console.log(usuario[0].puntaje)
    añadirPuntos = await MySQL.realizarQuery(`UPDATE Usuarios SET puntaje = ${usuario[0].puntaje} WHERE mail="${mailLogueado}";`);
    let usuarios = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE mail = "${mailLogueado}"`)// traer el puntajer del usuario logeado
    console.log(usuarios)
    res.send({validar: true});
        
    
});

app.post('/recargarTablas', async function(req, res) {
    //Petición DELETE con URL = "/login"
    let usuarios= await MySQL.realizarQuery("SELECT * FROM Usuarios")
    console.log("Soy un pedido GET", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
    res.render('Tablas', {usuario:usuarios})
    ;
});