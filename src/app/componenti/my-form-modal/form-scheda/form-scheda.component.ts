import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { EventoScheda } from 'src/app/model/EventoScheda';
import { ValoreEvento } from 'src/app/model/ValoreEvento';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { PlayerService } from 'src/app/servizi/player/player.service';

@Component({
  selector: 'form-scheda',
  templateUrl: './form-scheda.component.html',
  styleUrls: ['./form-scheda.component.scss']
})
export class FormScheda extends vrs implements OnInit {

  combo: any = []
  scheda_master: Array<EventoScheda> = [];
  play_comp = this.player.getCompetizione()


  constructor(
    private player: PlayerService,
    private alert: AlertService) {
    super();
  }

  ngOnInit() {
    this.getSchedaMaster()
  }


  onChangeGruppo(event: any, record: any) {

    let ele = event.target.value['0']

    let singolo = this.scheda_master.find((i: { tipo: number, girone: string, gruppo: number }) => i.tipo == this.TIPO_EVENTO.GIRONE && i.girone == record.girone && i.gruppo == this.GRUPPO_PUNTI.GIRONE_COMPLETO)
    if (!singolo) return

    singolo.valore.descrizione = ''

    let lista = this.scheda_master.filter((i: { tipo: number, girone: string, gruppo: number }) => i.tipo == this.TIPO_EVENTO.GIRONE && i.girone == record.girone && i.gruppo != this.GRUPPO_PUNTI.GIRONE_COMPLETO)

    let is_da_valorizzare = lista.some((i: { valore: ValoreEvento }) => !i.valore)

    if (!is_da_valorizzare) {
      let tmp: any[] = []
      let sigle = "";
      let sep = "";
      for (let ele of lista) {
        if (ele.valore.sigla && !tmp.some((i) => i == ele.valore.sigla)) {
          tmp.push(ele.valore.sigla)
          sigle = sigle + sep + ele.valore.sigla
          sep = "-"
        }
      }

      //nel caso tutto sia andato a buon fine
      if (lista.length == tmp.length) {
        singolo.valore = { id: 0, descrizione: sigle, punti: record.punti }
      }
    }
  }



  getSchedaMaster() {

    this.player.getSchedaMaster(this.play_comp.id)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.combo = result.combo
          this.scheda_master = result.master
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }


  onPlayScheda(input: Array<EventoScheda>) {
    console.log("onPlayScheda2 ", input)

  }


}
