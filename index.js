
const API_URL_BUSCAR = 'https://codigosreferidos.herokuapp.com/api/v1/codigos'
const API_URL_REFERIDOS = 'https://codigosreferidos.herokuapp.com/api/v1/referidos'
const buscar_codigo = document.getElementById('buscar_codigo')

const section_codigo_buscado = document.getElementById('section_codigo_buscado')
const section_anadir_referido = document.getElementById('section_anadir_referido')
const section_añadir_premio = document.getElementById('section_añadir_premio')
const error_span = document.getElementById('error')

let codigo_actual

async function buscarCodigo(){
    section_codigo_buscado.innerHTML = ''
    section_anadir_referido.innerHTML = ''

    const res = await fetch(API_URL_BUSCAR + "/" + String(buscar_codigo.value))
    const data = await res.json()

    
    

    if(res.status !== 200){
        const h3 = document.createElement('h3')
        const h3_text = document.createTextNode(`error: ${res.status} probablemente no hay ese codigo`)
        h3.appendChild(h3_text)
        section_codigo_buscado.appendChild(h3)
    
    }else{
        let datos = 0
        if(data.lastName){

            datos = `
            <h1>Codigo ${data.codigo}</h1>
            
            <p>nombre: ${data.name} ${data.lastName}</p>
            <p>telefono: ${data.telephone}</p>
            <p>Premio pendiente?: ${data.premio_pendiente}</p>

        `
        }else{
                datos = `
            <h1>Codigo ${data.codigo}</h1>
            
            <p>nombre: ${data.name} </p>
            <p>telefono: ${data.telephone}</p>
            <p>Premio pendiente?: ${data.premio_pendiente}</p>
        `
        }
        
        
        const referidos_text = `
        <input type="button" onclick="añadirReferido()" value="añadir referido"></input>
        `
        const premio_text = `
        <input type="button" onclick="añadirPremio()" value="Añadir premio"></input>
        `
        section_codigo_buscado.innerHTML = datos
        section_anadir_referido.innerHTML = referidos_text
        section_añadir_premio.innerHTML = premio_text
        
        codigo_actual = data.codigo

        console.log(data)
    }


    
}

async function añadirReferido(){
    const anadir_referido_text = `
    <h3>añadir referido a ${codigo_actual}</h3>
        <p>
            <form action="">
                <p>
                    <label for="referidos_nombre">ingresar referido </label>
                </p>
                <label for="referidos_nombre">nombre </label><input id="referidos_nombre" type="text"></input><br> 
                <label for="referidos_apellido">apellido </label><input id="referidos_apellido" type="text"></input><br> 
                <label for="referidos_telephone">telefono </label><input id="referidos_telephone" type="text"></input><br> 
                <input type="button" name="" id="" value="enviar referido" onclick="referido(referidos_nombre.value, referidos_apellido.value, referidos_telephone.value)">
                </form>
        </p>
    `
    section_anadir_referido.innerHTML = anadir_referido_text
    

}
async function referido(nombre, apellido, telefono){
    console.log(nombre, apellido, telefono)


    const res = await fetch(API_URL_REFERIDOS, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "codigoReferencia": codigo_actual,
            "name": nombre,
            "telephone": telefono
        })
    })
    
    const data = await res.json()

    if(res.status !== 201){
        error_span.innerHTML = 'error: ' + res.status + data.message
    }else{
        if(data){
            let message = ""
            if(data[1] == "ya se merece un premio") message = 'ya se merece un premio'
            const p = document.createElement('p')
            const p_text = document.createTextNode('se registro satisfactoriamente el nuevo referido : ) ' + message)
            p.appendChild(p_text)
            section_anadir_referido.appendChild(p)
        }
        
    }

}

async function añadirPremio(){

}