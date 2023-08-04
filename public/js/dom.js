async function entrar(data) {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

  try {
    const response = await fetch("/login", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);

    if (result.validar == false) {
      alert("Los datos son incorrectos")
    } else {
      //Envio el formularia desde dom para cambiar de pagina
      //Podria usar tambien un changeScreen()
      if (result.esadmin == true){
        document.getElementById("administrador").submit()  
        }  else 
        {document.getElementById("loguearse").submit()}
      
      }

  } catch (error) {
    console.error("Error:", error);
  }
}

//Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
function login() {
  //Leo los datos del input
  let usuario = document.getElementById("usuarioId").value
  let contraseña = document.getElementById("passwordId").value

  //Creo un objeto de forma instantanea
  let data = {
      user: usuario,
      pass: contraseña
  }

  //data es el objeto que le paso al back
  entrar(data)
}

async function mostrar() {
  try {
    const response = await fetch("/Admin", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({validar: true}),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);
    let vector = result.palabras[0]
    console.log("Success:", vector);
    let html = `
        <select name="select" id="word">
          <option value="value1" selected> Elegir Palabra</option>`
    for (let i in vector){
      html+=
      `
          <option>${vector[i].palabras}</option>
        
      `;
    }
    html += `</select>`;
    document.getElementById("seleccion").innerHTML = html;
    
  }
    catch (error) {
      console.error("Error:", error);
    
  }
}

async function borrar(){
  
}

function ganaste(){
  document.getElementById("botonComprobar").innerHTML += `        
        <div class="border" id="winner ${id}">
          <img src="img/fuegos.gif" id="imageFuegos">
          <img src="img/victory.png" id="imageFuegos">
        </div>
        <br>`;
}
let palabraAleatoria = ""
async function palabra_elegida(){
  
  try {
    const response = await fetch("/randomWord", {
      method: "POST", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
     // body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);

    palabraAleatoria = result.palabraAleatoria
    console.log(palabraAleatoria)
  } catch (error) {
    console.error("Error:", error);
  }
}
function comprobar(){
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
      alert("Correcto")
    }

}
function borrar(){
  palabra= document.getElementById("word")
  let data = {
    pregunta: palabra
}

eliminar(data)
}
async function eliminar(data) {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

  try {
    const response = await fetch("/eliminar", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
  } catch (error) {
    console.error("Error:", error);
  }
}