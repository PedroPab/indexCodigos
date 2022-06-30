const API_URL_REFERIDOS = 'https://codigosreferidos.herokuapp.com/api/v1/referidos'


const cookies = document.cookie.split('=')

const codigo_actual = cookies[cookies.length - 1]

const h1_referidos = document.getElementById('h1_referidos')
const span_mensage = document.getElementById('span_mensage')
const span_error = document.getElementById('span_error')
const formulario = document.getElementById('formulario')


window.onload = () => h1_referidos.innerHTML += codigo_actual


async function referido(nombre, apellido, telefono) {
    console.log(nombre, apellido, telefono)

    if (!nombre && !apellido && !telefono) {
        return span_error.innerHTML = 'debes ingresar los campos'
    }

    const body = {
        "codigoReferencia": codigo_actual,
        "name": nombre,
        "lastName": apellido,
        "telephone": String(telefono)
    }


    const res = await fetch(API_URL_REFERIDOS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await res.json()

    if (res.status !== 201) {

        console.log('error: ' + res.status + data.message)

        if (data.message.includes('duplicate key')) {
            span_mensage.innerHTML = 'error'
            span_error.innerHTML = 'el referido ya exite '
        }

        if(res.status == 400){
            span_mensage.innerHTML = 'error'
            span_error.innerHTML = res.status + ': ' + data.message
        }

    } else {

        if (data) {
            if (data[0].includes('INSERT') || data[1].includes('INSERT')) {
                span_mensage.innerHTML = 'se engreso correctamente el referido'
            }
            if (data[1].includes('ya se merece un premio')) {
                span_mensage.innerHTML = 'se engreso correctamente el referido'
                span_mensage.innerHTML += 'el cliente ya se merece un premio'
            }
            console.log(data)
            formulario.reset()

        }

    }

}

