import verificaNotas from "./verificaNotas.js";
import getConteudoDaNota from "./getConteudoDaNota.js";
import mudarIconeDaNota from "./mudarIconeDaNota.js";
import imprimeNota from "./imprimeNota.js";

main();

async function main(){
    const notaProntaParaImprimir = await verificaNotas();

    if(notaProntaParaImprimir){
        await mudarIconeDaNota(notaProntaParaImprimir, "bx bxs-hourglass");

        const notaComConteudo = await getConteudoDaNota(notaProntaParaImprimir);

        if(await imprimeNota(notaComConteudo)){
            console.log("Impressão realizada com sucesso.");
            await mudarIconeDaNota(notaProntaParaImprimir, "bx bxs-message-alt-check");
        }else {
            console.log("Impressão resultou em falha.");
            await mudarIconeDaNota(notaProntaParaImprimir, "bx bxs-message-alt-x");
        }
    }

    setTimeout(function (){
        main();
    },1000);
}
