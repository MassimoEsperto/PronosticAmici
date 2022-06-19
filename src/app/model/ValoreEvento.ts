export class ValoreEvento {

    id: number=0;
    descrizione: string=""; //view
    sigla?: string; // sigle view
    view?: string;
    girone?: string; //da verificare se serve
    punti?:string; //punti possibili

    constructor(
        id:number,
        descrizione:string      
        ) {
            this.id = id
            this.descrizione = descrizione
        }

}