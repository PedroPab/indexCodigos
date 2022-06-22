
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
        const datos = `
            <h1>Codigo ${data.codigo}</h1>
            
            <p>nombre: ${data.name} ${data.lastName}</p>
            <p>telefono: ${data.telephone}</p>
            <p>Premio pendiente?: ${data.premioPendiente}</p>
        `
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


 const lista_total = [
    {
        "id": 4,
        "name": "Victor Manuel Torres",
        "telephone": "3016345633",
        "codigo": 9143,
        "active": true
    },
    {
        "id": 5,
        "name": "David Carvajal",
        "telephone": "3054026004",
        "codigo": 1122,
        "active": true
    },
    {
        "id": 6,
        "name": "Camilo Guerrero",
        "telephone": "3218730905",
        "codigo": 2050,
        "active": true
    },
    {
        "id": 7,
        "name": "Sandra Quiceno",
        "telephone": "3014255046",
        "codigo": 1050,
        "active": true
    },
    {
        "id": 8,
        "name": "Diego Mejia",
        "telephone": "3193745684",
        "codigo": 5104,
        "active": true
    },
    {
        "id": 9,
        "name": "Yulied Botero",
        "telephone": "3014721964",
        "codigo": 66,
        "active": true
    },
    {
        "id": 10,
        "name": "Margarita Lopez",
        "telephone": "3022384240",
        "codigo": 2230,
        "active": true
    },
    {
        "id": 11,
        "name": "Andres Hernandes",
        "telephone": "3143732283",
        "codigo": 1521,
        "active": true
    },
    {
        "id": 12,
        "name": "Mauricio Ruiz",
        "telephone": "3174148442",
        "codigo": 5633,
        "active": true
    },
    {
        "id": 13,
        "name": "German David",
        "telephone": "3004008288",
        "codigo": 4412,
        "active": true
    },
    {
        "id": 14,
        "name": "Daniela Cardona",
        "telephone": "3042468657",
        "codigo": 8974,
        "active": true
    },
    {
        "id": 15,
        "name": "Veronica Mejia",
        "telephone": "3008684784",
        "codigo": 5522,
        "active": true
    },
    {
        "id": 16,
        "name": "Edison Misas",
        "telephone": "3017553364",
        "codigo": 3322,
        "active": true
    },
    {
        "id": 17,
        "name": "Miguel higuita",
        "telephone": "3007618827",
        "codigo": 5122,
        "active": true
    },
    {
        "id": 18,
        "name": "Elizabeth Carvajal",
        "telephone": "3117411494",
        "codigo": 3355,
        "active": true
    },
    {
        "id": 19,
        "name": "Sebastian Canon",
        "telephone": "3506843597",
        "codigo": 2525,
        "active": true
    },
    {
        "id": 20,
        "name": "Cesar Lopez",
        "telephone": "3015189757",
        "codigo": 2286,
        "active": true
    },
    {
        "id": 21,
        "name": "Alejandra Mazo",
        "telephone": "3138117364",
        "codigo": 4038,
        "active": true
    },
    {
        "id": 22,
        "name": "Yury Alejandra Alvares",
        "telephone": "3013172075",
        "codigo": 3837,
        "active": true
    },
    {
        "id": 23,
        "name": "Juan Pablo Rios",
        "telephone": "3013345563",
        "codigo": 3635,
        "active": true
    },
    {
        "id": 24,
        "name": "Jhonatan Marin",
        "telephone": "3017087477",
        "codigo": 3534,
        "active": true
    },
    {
        "id": 25,
        "name": "Adriana Santana",
        "telephone": "3046467464",
        "codigo": 3433,
        "active": true
    },
    {
        "id": 26,
        "name": "Jose Alejandro Blandon",
        "telephone": "3135886316",
        "codigo": 3233,
        "active": true
    },
    {
        "id": 27,
        "name": "Natalia Ruiz",
        "telephone": "3135700259",
        "codigo": 3029,
        "active": true
    },
    {
        "id": 28,
        "name": "Maria Alejandra Rincon",
        "telephone": "3215445568",
        "codigo": 2838,
        "active": true
    },
    {
        "id": 29,
        "name": "Wendy Arboleda",
        "telephone": "3214292643",
        "codigo": 3132,
        "active": true
    },
    {
        "id": 30,
        "name": "Jhon Fredy Gallego",
        "telephone": "3172685581",
        "codigo": 2030,
        "active": true
    },
    {
        "id": 31,
        "name": "Nancy Henao",
        "telephone": "3144592003",
        "codigo": 3495,
        "active": true
    },
    {
        "id": 32,
        "name": "Dario Parra ",
        "telephone": "3192692814",
        "codigo": 4283,
        "active": true
    },
    {
        "id": 33,
        "name": "Carlos Cardenas ",
        "telephone": "3222665339",
        "codigo": 2321,
        "active": true
    },
    {
        "id": 34,
        "name": "Esteban Henao ",
        "telephone": "3207289247",
        "codigo": 4312,
        "active": true
    },
    {
        "id": 35,
        "name": "Miguel Diaz",
        "telephone": "3106717951",
        "codigo": 1426,
        "active": true
    },
    {
        "id": 36,
        "name": "Laura Alvarez",
        "telephone": "3017956686",
        "codigo": 2849,
        "active": true
    },
    {
        "id": 37,
        "name": "Sergio Andres Marin ",
        "telephone": "3008511397",
        "codigo": 5011,
        "active": true
    },
    {
        "id": 38,
        "name": "Caterin Gutierrez",
        "telephone": "3046337007",
        "codigo": 2024,
        "active": true
    },
    {
        "id": 39,
        "name": "Mateo Gonzalez",
        "telephone": "3153344435",
        "codigo": 6787,
        "active": true
    },
    {
        "id": 40,
        "name": "Yesenia Yepes",
        "telephone": "3006981448",
        "codigo": 5362,
        "active": true
    },
    {
        "id": 41,
        "name": "Luisa Lotero",
        "telephone": "3015881550",
        "codigo": 624,
        "active": true
    },
    {
        "id": 42,
        "name": "Melany Atehortua",
        "telephone": "3016766911",
        "codigo": 1026,
        "active": true
    },
    {
        "id": 43,
        "name": "Yerlo Arango",
        "telephone": "3046790347",
        "codigo": 1458,
        "active": true
    },
    {
        "id": 44,
        "name": "Caterine Marin",
        "telephone": "3137905140",
        "codigo": 7958,
        "active": true
    },
    {
        "id": 45,
        "name": "Nelson Montoya",
        "telephone": "3136859420",
        "codigo": 8765,
        "active": true
    },
    {
        "id": 46,
        "name": "Margarita ",
        "telephone": "3217741474",
        "codigo": 5290,
        "active": true
    },
    {
        "id": 47,
        "name": "Mauricio Alcaraz",
        "telephone": "3218889655",
        "codigo": 7421,
        "active": true
    },
    {
        "id": 48,
        "name": "Sthephen Castañeda",
        "telephone": "3014049616",
        "codigo": 6789,
        "active": true
    },
    {
        "id": 49,
        "name": "Estefania Gallo Aguirre",
        "telephone": "3128651876",
        "codigo": 1120,
        "active": true
    },
    {
        "id": 50,
        "name": "Andrea Zapata",
        "telephone": "3147961420",
        "codigo": 3822,
        "active": true
    },
    {
        "id": 51,
        "name": "Santiago Restrepo",
        "telephone": "3052282056",
        "codigo": 1234,
        "active": true
    },
    {
        "id": 52,
        "name": "Felipe Lema ",
        "telephone": "3023697196",
        "codigo": 510,
        "active": true
    },
    {
        "id": 53,
        "name": "Santiago Gutierrez",
        "telephone": "3008466103",
        "codigo": 2021,
        "active": true
    },
    {
        "id": 54,
        "name": "Juan Hernandez",
        "telephone": "3507846395",
        "codigo": 3232,
        "active": true
    },
    {
        "id": 55,
        "name": "Maribel Torres",
        "telephone": "3167494475",
        "codigo": 3950,
        "active": true
    },
    {
        "id": 56,
        "name": "Santiago Gutierrez",
        "telephone": "3116024728",
        "codigo": 5263,
        "active": true
    },
    {
        "id": 57,
        "name": "Ana Maria Estrada",
        "telephone": "3234044828",
        "codigo": 2104,
        "active": true
    },
    {
        "id": 58,
        "name": "Patricia Cornelio",
        "telephone": "3024193494",
        "codigo": 4891,
        "active": true
    },
    {
        "id": 59,
        "name": "Heidy Hernandez",
        "telephone": "3192489117",
        "codigo": 1421,
        "active": true
    },
    {
        "id": 60,
        "name": "Cristian Londoño",
        "telephone": "3196429565",
        "codigo": 6525,
        "active": true
    },
    {
        "id": 61,
        "name": "Angie Lopez",
        "telephone": "3022071146",
        "codigo": 4557,
        "active": true
    },
    {
        "id": 62,
        "name": "Santiago López",
        "telephone": "3007009906",
        "codigo": 3656,
        "active": true
    },
    {
        "id": 63,
        "name": "katerine Villareal",
        "telephone": "3023376588",
        "codigo": 4758,
        "active": true
    },
    {
        "id": 64,
        "name": "Laura Isabel Pérez",
        "telephone": "3013437003",
        "codigo": 2365,
        "active": true
    },
    {
        "id": 65,
        "name": "Stefhany Ortiz",
        "telephone": "3015777315",
        "codigo": 9625,
        "active": true
    },
    {
        "id": 66,
        "name": "Juan José Medina",
        "telephone": "3195218198",
        "codigo": 9632,
        "active": true
    },
    {
        "id": 67,
        "name": "Luisa Fernanda Hoyos Giraldo",
        "telephone": "3165483271",
        "codigo": 4268,
        "active": true
    },
    {
        "id": 68,
        "name": "Juan Velasco ",
        "telephone": "3053735191",
        "codigo": 2587,
        "active": true
    },
    {
        "id": 69,
        "name": "Isadora Argaez",
        "telephone": "3104132772",
        "codigo": 6548,
        "active": true
    },
    {
        "id": 70,
        "name": "María Isabel Restrepo",
        "telephone": "3006198192",
        "codigo": 2236,
        "active": true
    },
    {
        "id": 71,
        "name": "Luz Cristina",
        "telephone": "3046089225",
        "codigo": 9512,
        "active": true
    },
    {
        "id": 72,
        "name": "Juan Fernando",
        "telephone": "3116789712",
        "codigo": 7535,
        "active": true
    },
    {
        "id": 73,
        "name": "Gabriel Rave",
        "telephone": "3145131767",
        "codigo": 5857,
        "active": true
    },
    {
        "id": 74,
        "name": "José Alejandro Yepes Restrepo",
        "telephone": "3217407950",
        "codigo": 7521,
        "active": true
    },
    {
        "id": 75,
        "name": "Maria Isabel Flores",
        "telephone": "3005372222",
        "codigo": 5426,
        "active": true
    },
    {
        "id": 76,
        "name": "Esteban Ocampo",
        "telephone": "3004373436",
        "codigo": 9563,
        "active": true
    },
    {
        "id": 77,
        "name": "Isaac Echeverría",
        "telephone": "3052236957",
        "codigo": 5285,
        "active": true
    },
    {
        "id": 78,
        "name": "Fredy Cuartas",
        "telephone": "3004129582",
        "codigo": 7854,
        "active": true
    },
    {
        "id": 79,
        "name": "Alexandra",
        "telephone": "3217710393",
        "codigo": 4521,
        "active": true
    },
    {
        "id": 80,
        "name": "Janeth Muñoz",
        "telephone": "3127986596",
        "codigo": 7461,
        "active": true
    },
    {
        "id": 81,
        "name": "Alejandro ",
        "telephone": "3132578832",
        "codigo": 9681,
        "active": true
    },
    {
        "id": 82,
        "name": "Giovanny Taborda",
        "telephone": "3108927157",
        "codigo": 6487,
        "active": true
    },
    {
        "id": 83,
        "name": "Gohan Moncada",
        "telephone": "3107367635",
        "codigo": 6542,
        "active": true
    },
    {
        "id": 84,
        "name": "Erika Ruiz ",
        "telephone": "3023582139",
        "codigo": 3864,
        "active": true
    },
    {
        "id": 85,
        "name": "Henry Echeverry",
        "telephone": "3146944911",
        "codigo": 3003,
        "active": true
    },
    {
        "id": 86,
        "name": "Ivonne Astrid Quintero ",
        "telephone": "3117607674",
        "codigo": 7532,
        "active": true
    },
    {
        "id": 87,
        "name": "Víctor",
        "telephone": "3016329180",
        "codigo": 2541,
        "active": true
    },
    {
        "id": 88,
        "name": "Jhon Anderson",
        "telephone": "3104006048",
        "codigo": 9547,
        "active": true
    },
    {
        "id": 89,
        "name": "fray",
        "telephone": "3024646226",
        "codigo": 3060,
        "active": true
    },
    {
        "id": 90,
        "name": "Yeraldin Cifuentes Velasquez",
        "telephone": "3017321831",
        "codigo": 6985,
        "active": true
    },
    {
        "id": 91,
        "name": "Yuliana Opsina",
        "telephone": "3192126528",
        "codigo": 4866,
        "active": true
    },
    {
        "id": 92,
        "name": "Andrea Guzman Luna",
        "telephone": "3006405614",
        "codigo": 1536,
        "active": true
    },
    {
        "id": 93,
        "name": "maria fernanda blandon ",
        "telephone": "3136953592",
        "codigo": 8030,
        "active": true
    },
    {
        "id": 94,
        "name": "Johana Gonzáles",
        "telephone": "3007253642",
        "codigo": 5236,
        "active": true
    },
    {
        "id": 95,
        "name": "Leeyet Nataly",
        "telephone": "3022156685",
        "codigo": 9631,
        "active": true
    },
    {
        "id": 96,
        "name": "Ana Carmona Dias",
        "telephone": "3022870005",
        "codigo": 5555,
        "active": true
    },
    {
        "id": 97,
        "name": "Leidy Estrada",
        "telephone": "3003562012",
        "codigo": 6667,
        "active": true
    },
    {
        "id": 98,
        "name": "Karla atehortua",
        "telephone": "3006688544",
        "codigo": 777,
        "active": true
    },
    {
        "id": 99,
        "name": "Olga Amparo Castaño",
        "telephone": "3007587814",
        "codigo": 5643,
        "active": true
    },
    {
        "id": 100,
        "name": "Sara Santos",
        "telephone": "3204853533",
        "codigo": 7400,
        "active": true
    },
    {
        "id": 101,
        "name": "Carolina",
        "telephone": "3225645857",
        "codigo": 9347,
        "active": true
    }
]

async function añadirCodigos(lista){

    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        const res = await fetch(API_URL_BUSCAR, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(element)
        })
        
        const data = await res.json()
    
        if(res.status !== 201){
            error_span.innerHTML = 'error: ' + res.status + data.message
            console.log('error' +  res.status + data.message)
        }
    }

    

}