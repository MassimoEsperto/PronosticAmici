import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { PlayerService } from 'src/app/servizi/player/player.service';

@Component({
  selector: 'nuova-scheda',
  templateUrl: './nuova-scheda.component.html',
  styleUrls: ['./nuova-scheda.component.scss']
})
export class NuovaSchedaComponent extends vrs implements OnInit {

  scheda_master: any = []
  id_comp: number = 1;
  completo: any = []
  prima: any = []
  seconda: any = []
  terza: any = []
  quarta: any = []

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

    let lista = this.scheda_master.squadre_girone[record.girone]


    switch (Number(record.gruppo)) {
      case this.GRUPPO_PUNTI.PRIMA_GIRONE:
        this.prima[record.girone] = lista[ele].sigla
        break;

      case this.GRUPPO_PUNTI.SECONDA_GIRONE:
        this.seconda[record.girone] = lista[ele].sigla
        break;

      case this.GRUPPO_PUNTI.TERZA_GIRONE:
        this.terza[record.girone] = lista[ele].sigla
        break;

      case this.GRUPPO_PUNTI.ULTIMA_GIRONE:
        this.quarta[record.girone] = lista[ele].sigla
        break;

      default:
        break;
    }

    this.completo[record.girone] =
      this.prima[record.girone] && this.seconda[record.girone] && this.terza[record.girone] && this.quarta[record.girone] &&
        this.prima[record.girone] != this.seconda[record.girone] &&
        this.prima[record.girone] != this.terza[record.girone] &&
        this.prima[record.girone] != this.quarta[record.girone] &&
        this.seconda[record.girone] != this.terza[record.girone] &&
        this.seconda[record.girone] != this.quarta[record.girone] &&
        this.terza[record.girone] != this.quarta[record.girone]

        ? this.prima[record.girone] + "-" + this.seconda[record.girone] + "-" + this.terza[record.girone] + "-" + this.quarta[record.girone] : ""

  }


  getSchedaMaster() {

    this.player.getSchedaMaster(this.id_comp.toString())
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.scheda_master = result
          let ttt = result['squadre_girone']

          console.log("scheda_master UTENTE", this.scheda_master.master)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  onPlayScheda(forms: any) {

    let master = this.scheda_master.master
    for (let record of master) {
      console.log("singolo", forms[record.id_evento])
      let fm = forms[record.id_evento]

      if (record.gruppo != this.GRUPPO_PUNTI.GIRONE_COMPLETO) {
        fm.risultato.punti = record.punti ? record.punti : fm.risultato.punti

        record['risultato'] = fm.risultato
      } else {
        record['risultato'] = { id: 0, descrizione: fm, punti: record.punti }
      }
    }
    this.loading_btn = false
    console.log("onPlayScheda", forms)
    console.log("master", master
    )

  }


}
