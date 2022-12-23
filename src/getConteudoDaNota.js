import axios from "axios";

export default async function getConteudoDaNota(nota){
    //console.log("Recuperando conteudo da nota.");
    const resp = await axios.get("http://iann1.masterdaweb.net:8080/etapi/notes/"+nota.noteId+"/content",{
        headers: {
            Authorization: "FMBCyO6Zfdiu_vd+SziwvIbcSjU+gwAYIOMc57SBiSiHXZLw13+6A6M8="
        }
    },);

    const conteudo = resp.data;

    nota.conteudo = conteudo;

    return nota;
}
