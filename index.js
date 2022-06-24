
const API_URL_BUSCAR = 'https://codigosreferidos.herokuapp.com/api/v1/codigos'
const API_URL_REFERIDOS = 'https://codigosreferidos.herokuapp.com/api/v1/referidos'
const API_URL_PREMIOS = 'https://codigosreferidos.herokuapp.com/api/v1/premios'

const buscar_codigo = document.getElementById('buscar_codigo')

const section_codigo_buscado = document.getElementById('section_codigo_buscado')
const section_anadir_referido = document.getElementById('section_anadir_referido')
const section_anadir_premio = document.getElementById('section_añadir_premio')
const error_span = document.getElementById('error')

let codigo_actual

async function buscarCodigo() {
    section_codigo_buscado.innerHTML = ''
    section_anadir_referido.innerHTML = ''

    const res = await fetch(API_URL_BUSCAR + "/" + String(buscar_codigo.value))
    const data = await res.json()




    if (res.status !== 200) {
        const h3 = document.createElement('h3')
        const h3_text = document.createTextNode(`error: ${res.status} probablemente no hay ese codigo`)
        h3.appendChild(h3_text)
        section_codigo_buscado.appendChild(h3)

    } else {
        let datos = 0
        if (data.lastName) {

            datos = `
            <h1>Codigo ${data.codigo}</h1>
            
            <p>nombre: ${data.name} ${data.lastName}</p>
            <p>telefono: ${data.telephone}</p>
            <p>Premio pendiente?: ${data.premio_pendiente}</p>

        `
        } else {
            datos = `
            <h1>Codigo ${data.codigo}</h1>
            
            <p>nombre: ${data.name} </p>
            <p>telefono: ${data.telephone}</p>
            <p>Premio pendiente?: ${data.premio_pendiente}</p>
        `
        }


        const referidos_text = `
        <input type="button" onclick="verReferidos()" value="ver referidos"></input><br>
        <input type="button" onclick="añadirReferido()" value="añadir referido"></input>
        `
        const premio_text = `
        <input type="button" onclick="añadirPremio()" value="Añadir premio"></input>
        `
        section_codigo_buscado.innerHTML = datos
        section_anadir_referido.innerHTML = referidos_text
        section_anadir_premio.innerHTML = premio_text

        codigo_actual = data.codigo

        console.log(data)
    }



}

async function añadirReferido() {
    const anadir_referido_text = `
    <h3>añadir referido a ${codigo_actual}</h3>
        <p>
            <form action="">
                <p>
                    <label for="referidos_nombre">ingresar referido </label>
                </p>
                <label for="referidos_nombre">nombre </label><input id="referidos_nombre" type="text"></input><br> 
                <label for="referidos_apellido">apellido </label><input id="referidos_apellido" type="text"></input><br> 
                <label for="referidos_telephone">telefono </label><input id="referidos_telephone" type="number"></input><br> 
                <input type="button" name="" id="" value="enviar referido" onclick="referido(referidos_nombre.value, referidos_apellido.value, referidos_telephone.value)">
                </form>
        </p>
    `
    section_anadir_referido.innerHTML = anadir_referido_text


}
async function referido(nombre, apellido, telefono) {
    console.log(nombre, apellido, telefono)


    const res = await fetch(API_URL_REFERIDOS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "codigoReferencia": codigo_actual,
            "name": nombre,
            "telephone": String(telefono) 
        })
    })

    const data = await res.json()

    if (res.status !== 201) {

        console.log('error: ' + res.status + data.message)

        if (data.message.includes('duplicate key')) {
            const p = document.createElement('p')
            const p_text = document.createTextNode('error: el telefono ya esta registrado ')
            p.appendChild(p_text)
            section_anadir_referido.appendChild(p)
        }

    } else {
        if (data) {
            let message = ""
            if (data[1] == "ya se merece un premio") message = 'ya se merece un premio'
            const p = document.createElement('p')
            const p_text = document.createTextNode('se registro satisfactoriamente el nuevo referido : ) ' + message)
            p.appendChild(p_text)
            section_anadir_referido.appendChild(p)
        }

    }

}

async function añadirPremio() {
    const anadir_premio_text = `
    <h3>añadir premio a ${codigo_actual}</h3>
        <p>
            <form action="">
                <p>
                    <label for="premio_nota">ingresar premio </label>
                </p>
                <label for="premio_nota">alguna nota que añadir? </label><input id="premio_nota" type="text"></input><br> 
                
                <input type="button" name="" id="" value="enviar premio" onclick="premio(codigo_actual ,premio_nota.value)">
                </form>
        </p>
    `
    section_anadir_premio.innerHTML = anadir_premio_text

}

async function premio(codigo, nota){
    console.log(codigo, nota)


    const res = await fetch(API_URL_PREMIOS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "codigoReferencia": codigo,
            "notas": nota || "null"
        })
    })

    const data = await res.json()   

    if ( res.status == 500 || 409) {
        
        let message =  'no tiene los suficiente referidos'
            const p = document.createElement('p')
            const p_text = document.createTextNode( message)
            p.appendChild(p_text)
            section_anadir_premio.appendChild(p)
        console.log(data , res)


    } else {
        if (data == 'INSERT') {
            let message = 'se registro el premio satisfactoriamente ¿'
            
            const p = document.createElement('p')
            const p_text = document.createTextNode( message)
            p.appendChild(p_text)
            section_anadir_premio.appendChild(p)

        }
        console.log('hhhhhhhhh')

    }
    console.log(res)

}

async function verReferidos(){
    const section_buscar_codigo = document.getElementById('section_buscar_codigo')
    section_buscar_codigo.innerHTML = '...cargando'

    const res = await fetch(API_URL_REFERIDOS + "/" + String(codigo_actual))
    const data = await res.json()

    console.log(data, res)

    if(res.status == 200){
        let text = `
            estos son los referidos de ${codigo_actual}
        `
        data.forEach(element => {
           text += `
            <br>
            <p>${element.name}</p>
           ` 
           console.log(element)
        });
        section_buscar_codigo.innerHTML = text
    }



    console.log('hola')
}