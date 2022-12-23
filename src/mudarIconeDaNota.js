import axios from "axios";

export default async function mudarIconeDaNota(nota,nomeDoIcone){
    //console.log("Alterando icone da nota: ", nota.noteId);
    const icone = nota.icone;
    const auxIcon = {
        value: nomeDoIcone,
    }
    const resp = await axios.patch("http://iann1.masterdaweb.net:8080/etapi/attributes/"+icone.attributeId,auxIcon,{
        headers: {
            Authorization: "FMBCyO6Zfdiu_vd+SziwvIbcSjU+gwAYIOMc57SBiSiHXZLw13+6A6M8="
        }
    });
}
