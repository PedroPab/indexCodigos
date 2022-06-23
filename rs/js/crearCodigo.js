const API_URL_CREAR_CODIGO = 'https://codigosreferidos.herokuapp.com/api/v1/codigos'
const API_URL_BUSCAR = 'https://codigosreferidos.herokuapp.com/api/v1/codigos'

const section_creacion_mensaje = document.getElementById('section_creacion_mensaje')
const label_codigo = document.getElementById('label_codigo')

const codigo = document.getElementById('codigo')

codigo.addEventListener('blur', async function (evente) {

    const res = await fetch(API_URL_BUSCAR + "/" + codigo.value)
    const data = await res.json()
    if (codigo.value !== '') {


        if (res.status == 200) {
            const mensaje = 'el codigo ya esta en uso cambialo o se te pondra uno por defecto '
            label_codigo.innerHTML = `<p> ${mensaje} </p>`
        } else {
            label_codigo.innerHTML = `ingresar nuevo codigo`

        }
    }
})

async function crearNuevoCodigo(codigo, nombre, apellido, telefono) {

    const body = {
        "id": 1,
        "name": nombre,
        "lastName": apellido,
        "telephone": String(telefono),
        "codigo": parseInt(codigo) || 1,
        "active": true
    }
    const res = await fetch(API_URL_CREAR_CODIGO, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await res.json()

    if (res.status !== 201) {
        console.error(data, res)
        console.error('error')
        const texto = `error, probablemete el telefono ya esta en uso `

        section_creacion_mensaje.innerHTML = texto

    } else {
        let diferente = ''
        if (codigo != data.codigo) diferente = 'el codigo que pusiste no esta disponible'
        const texto = `
        <h3>tu nuevo codigo quedo registrado de la siguiente manera:</h3>
        ${diferente}
        <p><h2>codigo:${data.codigo}</h2></p>
        <p>nombre:${data.name}</p>
        <p>apellido:${data.lastName}</p>
        <p>telefono:${data.telephone}</p>            
        `
        console.log(data, res)
        console.log('todo bien ')
        section_creacion_mensaje.innerHTML = texto
    }
    console.log({ body })
}