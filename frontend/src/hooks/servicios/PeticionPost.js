

 export const PeticionPost = async(url) => {

    const resp = await fetch(url, {
        method: "Get",
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(data)
    });

    const Respuesta = await resp.json();

    console.log(Respuesta)
}