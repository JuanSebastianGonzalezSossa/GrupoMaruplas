
 export const PeticionDelete = async(url) => {

    const resp = await fetch(url, {
        method: "POST",
    });

    const Respuesta = await resp.json();

    console.log(Respuesta)
}