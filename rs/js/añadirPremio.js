
const API_URL_PREMIOS = 'https://codigosreferidos.herokuapp.com/api/v1/premios'

const cookies = document.cookie.split('=')

const codigo_actual = cookies[cookies.length - 1]

const h1_premio = document.getElementById('h1_premio')
const span_mensage = document.getElementById('span_mensage')
const span_error = document.getElementById('span_error')

window.onload = ()=> h1_premio.innerHTML += codigo_actual

async function premio(codigo, nota){
    console.log(codigo, nota)


    const res = await fetch(API_URL_PREMIOS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "codigoReferencia": codigo_actual,
            "notas": nota || "null"
        })
    })

    const data = await res.json()   

    if ( res.status == 500 || res.status == 409) {
        
        let message =  'no tiene los suficiente referidos'
        span_error.innerHTML = message

        console.log(message)


    } else if (res.status == 400) {
        span_error.innerHTML = ' ve a inicio y registra un codigo'
        console.log(res.statu + ' ' + data.message)

    }else {
        if (data == 'INSERT') {
            let message = 'se registro el premio satisfactoriamente ¿'
            span_mensage.innerHTML += message
            console.log(message)

        }

    }

}
