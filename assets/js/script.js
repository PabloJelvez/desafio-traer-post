let urlApi = "https://jsonplaceholder.typicode.com/posts";

const getData = async (url) => {
let code;
try{
    let response = await fetch(url);
    if(response.status == 200){
        let data = await response.json();
        console.log(data)
        return {code: 200, data};
    } else {
        code = response.status;
        throw new Error("Llamada de la Api fallido")
    }
   
    
} catch(error){
    return {code, message: "Llamada a la Api fallido"}

}
}

const agregarPost =  (listado) => {
    let elementoLista = "";
    listado.forEach(post =>{
        elementoLista+= `<li class="py-2"><p>Número usuario: ${post.userId} - Id post: ${post.id}</p>
        Titulo: <strong>${post.title}</strong><p>Post: ${post.body}</p></li>`
    })
    document.getElementById("ulPost").innerHTML = elementoLista;
}

const generarRetardo = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve("Procesando respuesta")
        }, 3000)
    })
}

const main = async () =>{
    let parrafoResultado =  document.getElementById("resultadoApi");
    parrafoResultado.innerText = "Realizando solicitudes a la Api"
    let mensajeRetardo = await generarRetardo();
    parrafoResultado.innerText = mensajeRetardo
    let datos = await getData(urlApi);
    if(datos.code == 200){
        let data = datos.data;
        parrafoResultado.innerText = `Resultado exitoso, estos son los post que encontramos`;
        agregarPost(data);
    } else {
       parrafoResultado.innerText = datos.message;
    }
}