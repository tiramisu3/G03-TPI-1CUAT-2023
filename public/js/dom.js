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
    let vector2 = result.usuarios[0]

    console.log("Success:", vector);
    console.log("Success:", vector2);
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
    let html2 = `
        <select name="select" id="user">
          <option value="value1" selected> Elegir Usuario</option>`
    for (let i in vector2){
      html2+=
      `
          <option>${vector2[i].nom_usuario}</option>
        
      `;
    }
    html += `</select>`;
    document.getElementById("seleccionUsuario").innerHTML = html2;
    
  }
    catch (error) {
      console.error("Error:", error);
    
  }
}

async function borrar(){
  
}


let palabraalea={}

let plabraalea = ""

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

    console.log(result)
    palabraalea = result.word.palabras; 


    palabraalea = result.word.palabras

    console.log(palabraalea)
  } catch (error) {
    console.error("Error:", error);
  }
}
let puntaje=0;
let intentos=0;
function comprobar(){
    let letter1 = document.getElementById("txt1").value;
    let letter2 = document.getElementById("txt2").value;
    let letter3 = document.getElementById("txt3").value;
    let letter4 = document.getElementById("txt4").value;
    let letter5 = document.getElementById("txt5").value;
    let word1 = (letter1 +  letter2 + letter3 + letter4 + letter5).toUpperCase();
    let letter6 = document.getElementById("txt6").value;
    let letter7 = document.getElementById("txt7").value;
    let letter8 = document.getElementById("txt8").value;
    let letter9 = document.getElementById("txt9").value;
    let letter10 = document.getElementById("txt10").value;
    let word2 = (letter6 +  letter7 + letter8 + letter9 + letter10).toUpperCase();
    let letter11 = document.getElementById("txt11").value;
    let letter12 = document.getElementById("txt12").value;
    let letter13 = document.getElementById("txt13").value;
    let letter14 = document.getElementById("txt14").value;
    let letter15 = document.getElementById("txt15").value;
    let word3 = (letter11 +  letter12 + letter13 + letter14 + letter15).toUpperCase();
    let letter16 = document.getElementById("txt16").value;
    let letter17 = document.getElementById("txt17").value;
    let letter18 = document.getElementById("txt18").value;
    let letter19 = document.getElementById("txt19").value;
    let letter20 = document.getElementById("txt20").value;
    let word4 = (letter16 +  letter17 + letter18 + letter19 + letter20).toUpperCase();
    let letter21 = document.getElementById("txt21").value;
    let letter22 = document.getElementById("txt22").value;
    let letter23 = document.getElementById("txt23").value;
    let letter24 = document.getElementById("txt24").value;
    let letter25 = document.getElementById("txt25").value;
    let word5 = (letter21 +  letter22 + letter23 + letter24 + letter25).toUpperCase();
    let words=[word1,word2,word3,word4,word5]
    if (palabraalea == word1 ){
      puntaje += 100
      intentos +=1
      ganaste(1)
      intentos=6;
    }else if(palabraalea == word2){
      puntaje += 80
      intentos +=1
      ganaste(2)
      intentos=6;
    }else if (palabraalea == word3){
      puntaje += 60
      intentos +=1
      ganaste(3)
      intentos=6;
    }else if(palabraalea == word4){
      puntaje += 40
      intentos +=1
      ganaste(4)
      intentos=6;
    }else if(palabraalea == word5){
      puntaje += 20
      intentos +=1
      ganaste(5)
    }else{
      intentos += 1
      if (intentos == 5){
        perdiste()
      }
    }
    for(let i in words){
      cerca(words[i], i)
    }
    let a=((intentos-1)*5)+1;//seguircon esto
    let b=intentos*5;
      if (intentos == 1){
        var dis2 =document.getElementById("palb2").getElementsByTagName('input');
        for (var d2 of dis2) {
            d2.disabled = false;
        }
        var dis1 =document.getElementById("palb1").getElementsByTagName('input');
        for (var d1 of dis1) {
            d1.disabled = true;
        }
      } else if(intentos==2){
        var dis3 =document.getElementById("palb2").getElementsByTagName('input');
        for (var d3 of dis3) {
            d3.disabled = true;
        }
        var dis4 =document.getElementById("palb3").getElementsByTagName('input');
        for (var d4 of dis4) {
            d4.disabled = false;
        }
      } else if(intentos==3){
        var dis6 =document.getElementById("palb4").getElementsByTagName('input');
        for (var d6 of dis6) {
            d6.disabled = false;
        }
        var dis5 =document.getElementById("palb3").getElementsByTagName('input');
        for (var d5 of dis5) {
            d5.disabled = true;
        }
      } else if(intentos==4){
        var dis6 =document.getElementById("palb4").getElementsByTagName('input');
        for (var d6 of dis6) {
            d6.disabled = true;
        }
        var dis7 =document.getElementById("palb5").getElementsByTagName('input');
        for (var d7 of dis7) {
            d7.disabled = false;
        }
      } else if(intentos>4){
        var dis8 =document.getElementById("palb5").getElementsByTagName('input');
        for (var d8 of dis8) {
            d8.disabled = true;
        }
      }
    
}
function cerca(word, wordNumber){
  if(word.length==5){
    let ussable=[];
    for(i in 5){
      ussable.push(true)
      console.log(ussable)
    }
    for (let i in palabraalea){
      if(palabraalea[i]==word[i]){
        ussable[i]=false;
        document.getElementById("txt"+((wordNumber)*5+(parseInt(i)+1)).toString()).className="TXT2"
      }
    }
    for (let i in palabraalea){
      if (ussable[i]==true) {
        if (palabraalea.includes(word[i])){
          document.getElementById("txt"+((wordNumber)*5+(parseInt(i)+1)).toString()).className="TXT3"
        } 
      } 
    }
  }
}



function ganaste(plb){
  let a=((plb-1)*5)+1;
  let b=plb*5;

  for(let i=a;i<=b;i++){
    hola="txt"+i;
    document.getElementById(hola).className="TXT2";
  }
  console.log(document.getElementById(plb))
  document.getElementById("Comprobar").innerHTML += `        
    <br>
    <div id="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">GANASTE</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onclick="cerrarModal()">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>FELICITACIONES</p>
          <p>Lo lograste en: ${intentos} intentos</p>
          <p>Tu puntaje es de: ${puntaje} puntos</p>
        </div>
        </div>
      </div>
    </div>
  </div>
  <br>`;
}


function perdiste(){
  document.getElementById("Comprobar").innerHTML += ` 
         <br>
         <div id="modal" tabindex="-1" role="dialog">
         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title">PERDISTE</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onclick="cerrarModal()">&times;</span>
               </button>
             </div>
             <div class="modal-body">
               <p>Utilizaste tus 5 intentos</p>
               <p>La palabra era: ${palabraalea}</p>
             </div>
             </div>
           </div>
         </div>
       </div>
        <br>`
}
function cerrarModal() {
  document.getElementById("modal").innerHTML = ""
}
function borrar(){
  palabra= document.getElementById("word").value
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
    const result = await response.json();
    console.log("borrar ok ", result);

    if (result.validar == false) {
      alert("No se pudo borrar la palabra")
    }
    else {
     console.log("Palabra borrada")
     location.href = '/Admin'
  } 
}
  catch (error) {
    console.error("Error:", error);
  }
}
function agregar(){
  let palabra = document.getElementById("nuevaPalabra").value
  console.log(palabra)
  let data = {
    pregunta: palabra
  }

  nuevaPalabra(data)
}

async function nuevaPalabra(data){
  try {
    const response = await fetch("/agregar", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success palabra:", result);

    if (result.validar == false) {
      alert("No se pudo agregar la palabra")
    }
    else {
     console.log("Palabra agregada")
     location.href = '/Admin'

  } 
}
  catch (error) {
    console.error("Error:", error);
  }
}

function borrarUsuario(){
  usuario= document.getElementById("user").value
  console.log(usuario)
  let data = {
    pregunta: usuario
  }
eliminarUsuario(data)
}

async function eliminarUsuario(data) {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

  try {
    const response = await fetch("/eliminarUsuario", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("borrar ok ", result);

    if (result.validar == false) {
      alert("No se pudo borrar el usuario")
    }
    else {
     console.log("Usuario borrado")
     location.href = '/Admin'
  } 
}
  catch (error) {
    console.error("Error:", error);
  }

}

function volverJugar(){
  location.href = '/home'

}

function salir(){
  location.href = '/volver'

}