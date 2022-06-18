
const API_URL_BUSCAR = 'https://codigosreferidos.herokuapp.com/api/v1/codigos/'
const buscar_codigo = document.getElementById('buscar_codigo')

const section_codigo_buscado = document.getElementById('section_codigo_buscado')
const section_anadir_referido = document.getElementById('section_anadir_referido')
const section_añadir_premio = document.getElementById('section_añadir_premio')

async function buscarCodigo(){
    section_codigo_buscado.innerHTML = ''
    section_anadir_referido.innerHTML = ''

    const res = await fetch(API_URL_BUSCAR + String(buscar_codigo.value))
    const data = await res.json()

    
    

    if(res.status !== 200){
        const h3 = document.createElement('h3')
        const h3_text = document.createTextNode(`error: ${res.status} probablemente no hay ese codigo`)
        h3.appendChild(h3_text)
        section_codigo_buscado.appendChild(h3)
    
    }else{
        const datos = `
            <h1>Codigo ${data.codigo}</h1>
            
            <p>nombre: ${data.name} ${data.lastName}</p>
            <p>telefono: ${data.telephone}</p>
            <p>Premio pendiente?: ${data.premioPendiente}</p>
        `
        const referidos_text = `
        <h2><a href="./rs/index.html">añadir referido</a></h2>
        `
        const premio_text = `
        <h2><a href="./rs/index.html">añadir premio</a></h2>
        `
        section_codigo_buscado.innerHTML = datos
        section_anadir_referido.innerHTML = referidos_text
        section_añadir_premio.innerHTML = premio_text
    
        console.log(data)
    }

    
    
    
}