const sectionSeleccionarAtaque = document.getElementById('seleccionar_ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar_mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const subtitulo = document.getElementById('subtitulo2')

const imgMascotaJugador = document.getElementById('img-mascota-jugador')
const imgMascotaEnemigo = document.getElementById('img-mascota-enemigo')

let jugadorId = null
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
let rutaImagenMascota

let juegoActivo = true
let music

let audioWin = new Audio('au/win.mp3')
let audioLose = new Audio('au/lose.mp3')
let audioFire = new Audio('au/fire.mp3')
let audioWater = new Audio('au/water.mp3')
let audioPlat = new Audio('au/plat.mp3')
let audioSelect = new Audio('au/select.mp3')
let audioReset = new Audio('au/reset.mp3')
let menuSelect = new Audio('au/selectionClick.mp3')
let audio = new Audio('au/opening.mp3')

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Aquea', 'img/Aquea.webp', 3)
let capipepo = new Mokepon('Terran', 'img/Terran.webp', 3)
let ratigueya = new Mokepon('Pyron', 'img/Pyron.webp', 3)
let langostelvis = new Mokepon('Hydroblaze', 'img/Hydroblaze.webp', 3)
let tucapalma = new Mokepon('Moltenearth', 'img/Moltenearth.webp', 3)
let pydos = new Mokepon('Terramist', 'img/Terramist.webp', 3)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'}
)

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'}
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}
)

langostelvis.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}
)

tucapalma.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'}
)

pydos.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'}
)

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `

        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Aquea')
        inputCapipepo = document.getElementById('Terran')
        inputRatigueya = document.getElementById('Pyron')
        inputLangostelvis = document.getElementById('Hydroblaze')
        inputTucapalma = document.getElementById('Moltenearth')
        inputPydos = document.getElementById('Terramist')

        contenedorTarjetas.addEventListener('change', (event) => {
            if (event.target.tagName === 'INPUT' && event.target.type === 'radio') {
                menuSelect.play();
            }
        })    
    })

    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', () => {
        audioSelect.play()
        seleccionarMascotaJugador()
    })
    
    botonReiniciar.addEventListener('click',  reiniciarJuego)
}

function seleccionarMascotaJugador(){
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
        rutaImagenMascota = hipodoge.foto
    }else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
        rutaImagenMascota = capipepo.foto
    }else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
        rutaImagenMascota = ratigueya.foto
    }else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
        rutaImagenMascota = langostelvis.foto 
    }else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
        rutaImagenMascota = tucapalma.foto
    }else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
        rutaImagenMascota = pydos.foto
    }else {
        alert('Debe seleccionar un personaje')
        return
    }

    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    imgMascotaJugador.src = rutaImagenMascota;

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                audioFire.play()
                console.log(ataqueJugador)
            } else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                audioWater.play()
                console.log(ataqueJugador)
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                audioPlat.play()
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaEnemigo = aleatorio(0, mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaEnemigo].nombre
    ataquesMokeponEnemigo = mokepones[mascotaEnemigo].ataques

    rutaImagenMascota = mokepones[mascotaEnemigo].foto
    imgMascotaEnemigo.src = rutaImagenMascota

    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    if(juegoActivo) {
        if (ataquesMokeponEnemigo.length > 0) {
            let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
        
            ataqueEnemigo.push(ataquesMokeponEnemigo[ataqueAleatorio].id.split("-")[1].toUpperCase())
            ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)
            console.log(ataqueEnemigo)
            combate()
        } else {
            let ataqueAleatorio = aleatorio(0, ataqueEnemigo.length - 1)
            ataqueEnemigo.push(ataqueEnemigo[ataqueAleatorio]);
            console.log(ataqueEnemigo)
            combate()
        }
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    let index = ataqueJugador.length - 1
    if(ataqueJugador[index] === ataqueEnemigo[index]) {
        console.log('Enemigo: ' + ataqueEnemigo[index] + ' Jugador: ' + ataqueJugador[index])
        indexAmbosOponentes(index, index)
        crearMensaje("💩EMPATE💩")
    } else if ((ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') || (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') || (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA')) {
        console.log('Enemigo: ' + ataqueEnemigo[index] + ' Jugador: ' + ataqueJugador[index])
        indexAmbosOponentes(index, index)
        crearMensaje("🏆GANASTE🏆")
        vidasEnemigo--
    } else {
        console.log('Enemigo: ' + ataqueEnemigo[index] + ' Jugador: ' + ataqueJugador[index]) 
        indexAmbosOponentes(index, index)
        crearMensaje("☠️PERDISTE☠️")
        vidasJugador--
    }
    revisarVidas()
}

function revisarVidas() {
    if (vidasJugador === 2) {
        spanVidasJugador.innerHTML = '❤️❤️🖤'
    } else if (vidasJugador === 1) {
        spanVidasJugador.innerHTML = '❤️🖤🖤'
    } else if (vidasJugador === 0) {
        spanVidasJugador.innerHTML = '🖤🖤🖤💀'
        crearMensajeFinal('☠️ ERES EL PERDEDOR ☠️')
        juegoActivo = false
        audioLose.play()
    }

    if (vidasEnemigo === 2) {
        spanVidasEnemigo.innerHTML = '❤️❤️🖤'
    } else if (vidasEnemigo === 1) {
        spanVidasEnemigo.innerHTML = '❤️🖤🖤'
    } else if (vidasEnemigo === 0) {
        spanVidasEnemigo.innerHTML = '🖤🖤🖤💀'
        crearMensajeFinal('🏆 ERES EL GANADOR 🏆')
        juegoActivo = false
        audioWin.play()
    }

    if (!juegoActivo) {
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    contenedorAtaques.style.display = 'none'
    subtitulo.style.display = 'none'
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    juegoActivo = true
    botonFuego.disabled = false
    botonAgua.disabled = false
    botonTierra.disabled = false

    audioReset.play()

    setTimeout(() => {
        location.reload();
    }, 500)
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)