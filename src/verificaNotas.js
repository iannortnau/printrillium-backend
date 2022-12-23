import axios from "axios";

export default async function verificaNotas(){
    //console.log("Verificando Rascunhos.")
    const notas = await getNotas();

    //console.log("Verificando estado das Notas.")
    for (let i = 0; i < notas.length; i++) {
        const notaId = notas[i];

        const resp = await verificaEstado(notaId);
        const icone = resp.attribute;
        const nota = resp.nota;

        if(icone){
            //console.log("Nota pronta para imprimir encontrada.")
            nota.icone = icone;
            return nota;
        }
    }
    return null;
}

async function getNotas(){
    //console.log("Carregando Notas.")
    const notas = await axios.get("http://iann1.masterdaweb.net:8080/etapi/notes",{
        headers: {
            Authorization: "FMBCyO6Zfdiu_vd+SziwvIbcSjU+gwAYIOMc57SBiSiHXZLw13+6A6M8="
        },
        params:{
            search: "OGxcQHtRbkRW"
        }
    });
    const resp = notas.data.results[0].childNoteIds;

    //console.log(resp.length+" Notas carregadas.");
    return resp;
}

async function verificaEstado(auxNota){
    const resp = await axios.get("http://iann1.masterdaweb.net:8080/etapi/notes",{
        headers: {
            Authorization: "FMBCyO6Zfdiu_vd+SziwvIbcSjU+gwAYIOMc57SBiSiHXZLw13+6A6M8="
        },
        params:{
            search: auxNota
        }
    });

    const nota = resp.data.results[0];

    for (let i = 0; i < nota.attributes.length; i++) {
        const attribute = nota.attributes[i];

        if(attribute.name === "tipo"){
            nota.tipo = attribute.value;
        }

        if(attribute.name === "iconClass" && attribute.value === "bx bx-printer"){
            return {nota,attribute};
        }
    }
    return false;
}
