const API_URL_BUSCAR = 'https://codigosreferidos.herokuapp.com/api/v1/codigos'
const API_URL_REFERIDOS = 'https://codigosreferidos.herokuapp.com/api/v1/referidos'
const API_URL_PREMIOS = 'https://codigosreferidos.herokuapp.com/api/v1/premios'

const codigo_actual = document.cookie.split('=')


const error_span = document.getElementById('spna_status')

const codigoH1 = document.getElementById('codigo')
const nombre = document.getElementById('nombre')
const telefono = document.getElementById('telefono')
const referidos = document.getElementById('referidos')
const premios = document.getElementById('premios')
const premio_pendiente = document.getElementById('premio_pendiente')

window.onload = buscarCodigo(codigo_actual[codigo_actual.length - 1])



async function buscarCodigo(codigo) {

    console.log(codigo)

    const res = await fetch(API_URL_BUSCAR + "/" + String(codigo))
    const data = await res.json()

    if (res.status !== 200) {
        error_span.innerHTML = `ERROR ${res.status}`

    } else {

        codigoH1.innerHTML += data.codigo
        nombre.innerHTML += data.name + ' ' + data.last_name
        telefono.innerHTML += data.telephone
        referidos.innerHTML +=  await cantidadReferisdos(codigo, API_URL_REFERIDOS)
        premios.innerHTML +=  await cantidadReferisdos(codigo, API_URL_PREMIOS)
        data.premio_pendiente ? premio_pendiente.innerHTML += 'Si!!!' : premio_pendiente.innerHTML += 'no' 
        
        

        console.log(data)

    }

}


async function cantidadReferisdos(codigo , URL) {

    const res = await fetch(URL + "/" + String(codigo))
    const data = await res.json()

    if (res.status !== 200) {
        return 0

    } else {
        return data.length

    }

}