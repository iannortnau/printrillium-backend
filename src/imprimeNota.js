import ThermalPrinter from "node-thermal-printer";
import PrinterTypes from "node-thermal-printer";
import fs from "fs";
import client from "http";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios, {Axios} from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let printer = new ThermalPrinter.printer({
    type: PrinterTypes.types.EPSON,
    removeSpecialCharacters: true,
    interface: "/dev/usb/lp0",
    width: 42
});
export default async function imprimeNota(nota) {
    try {
        console.log("Impressão iniciada");
        printer.alignCenter();
        printer.setTextSize(3,3);
        printer.println(nota.title);
        printer.setTextNormal();
        printer.drawLine();
        printer.alignLeft();
        const paragrafos = nota.conteudo.split("</p>");
        for (let i = 0; i < paragrafos.length; i++) {
            paragrafos[i] = paragrafos[i].replace(/<[^>]*>/g, "");
            paragrafos[i] = paragrafos[i].replace("&nbsp;", "");

            printer.println(paragrafos[i]);
        }

        printer.cut();

        await printer.beep();

        await printer.execute();

        await printer.clear();

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
