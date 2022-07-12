const API_URL_REFERIDOS = 'https://codigosreferidos.herokuapp.com/api/v1/referidos'

const cookies = document.cookie.split('=')

const codigo_actual = cookies[cookies.length - 1]
const section_total = document.getElementById('section_total')

verReferidos()


async function verReferidos(){
    
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
            <p>id :${element.id}</p>
            <p>nombre: ${element.name}</p>
            <p>telefono: ${element.telephone}</p>
            <p>creado: ${element.create}</p>
            <p>active: ${element.active}</p>
            <p></p>
           ` 
           console.log(element)
        });
        section_total.innerHTML = text
    }



}