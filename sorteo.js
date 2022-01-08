const inputNombres = document.querySelector(".input-nombre")
const botonSubmit = document.querySelector(".submit")
const listaContainer = document.querySelector(".lista_container")
let listaDePersonas = []
const botonBorrar = document.querySelector(".span_x")
const botonSortear = document.querySelector(".boton_sorteo")
const containerGanador = document.querySelector(".container_ganador")

botonSubmit.addEventListener("click", registrar)
botonSortear.addEventListener("click", sortear)


function registrar(){
    if(inputNombres.value === ""){
        alert("el espacio no puede quedar vacio")
        return
    }

    let persona = {
       nombre: inputNombres.value
       
    }
    listaDePersonas.push(persona)
    localStorage.setItem("personas", JSON.stringify(listaDePersonas) )
    inputNombres.value=""
    plasmarEnLista()
}

function  plasmarEnLista(){
    listaContainer.innerHTML = ""
    let lista = JSON.parse(localStorage.getItem("personas"))
    lista.forEach(element => {
        const div = document.createElement("div")
        div.innerHTML += `${element.nombre} <span class="span_x">X</span>`
        div.classList.add("lista-registrados")
        listaContainer.append(div)
    });
    
}
listaContainer.addEventListener("click", e=>{
    let texto = (e.path[1].childNodes[0].textContent)
    let trimmedTexto = texto.trim();

    if(e.target.innerHTML = "X"){
        borrarDeLS(trimmedTexto)
   
    }
})

function borrarDeLS(trimmedTexto){
    let indexABorrar = listaDePersonas.findIndex(persona => persona.nombre === trimmedTexto)
    console.log(indexABorrar)
    listaDePersonas.splice(indexABorrar,1 )
    localStorage.setItem("personas", JSON.stringify(listaDePersonas) )
    plasmarEnLista()
}

function sortear(){
    if(containerGanador.firstChild){
        containerGanador.removeChild(containerGanador.firstChild)
    }
    const nombreGanador = document.createElement("div")
    nombreGanador.classList.add("nombre_ganador")
    nombreGanador.innerHTML = listaDePersonas[Math.floor(Math.random()* listaDePersonas.length)].nombre
    containerGanador.append(nombreGanador)
   //console.log(listaDePersonas[Math.floor(Math.random()* listaDePersonas.length)].nombre)
}
//``
window.addEventListener("DOMContentLoaded",plasmarEnLista)

