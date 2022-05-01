import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { AdminEventiService } from 'src/app/servizi/admin/admin-eventi.service';

@Component({
  selector: 'scheda-master',
  templateUrl: './scheda-master.component.html',
  styleUrls: ['./scheda-master.component.scss']
})
export class SchedaMasterComponent extends vrs implements OnInit {

  @Input() id_comp: number = 0;
  @Input() combo: any;
  eventi_antepost: any
  eventi_girone: any
  step_view: number = 0
  squadre: any = []
  master: any = []
  gironi_disponibili: any = []


  constructor(private adminEventi: AdminEventiService) {
    super();
  }

  ngOnInit() { }

  ngOnChanges() {

    if (this.id_comp > 0) {
      this.getSquadreComp(this.id_comp.toString())
      this.getSchedaMaster()
      this.getTipiPronostici()
    }
  }

  onChangeTipo(event: any) {
    console.log("onChangeTipo", event.target.value)
    this.step_view = Number(event.target.value) || 0

  }

  onSetEventoAntepost(e: any) {

    let esiste: boolean = this.master.some(
      (i: { gruppo_punti_id: any; }) =>
        i.gruppo_punti_id == e.antepost.id_gruppo_punti);

    if (esiste) {
      console.log("già esiste")
      this.loading_btn = false
      return;
    }
    let payload = {
      id_comp: this.id_comp,
      tipo_evento: this.step_view,
      view: e.antepost.descrizione,
      gruppo_evento: e.antepost.id_gruppo_punti,
      girone: ""
    }


    this.setEventMaster(payload)
  }

  onSetEventoPartita(e: any) {

    let girone = e.squadra_casa.girone && e.squadra_casa.girone == e.squadra_trasferta.girone ? e.squadra_casa.girone : ""
    let partita = e.squadra_casa.descrizione + "-" + e.squadra_trasferta.descrizione;

    let payload = {
      id_comp: this.id_comp,
      tipo_evento: this.step_view,
      view: partita,
      gruppo_evento: 0,
      girone: girone
    }

    this.setEventMaster(payload)
  }


  onSetEventoGirone(e: any) {

console.log(e)
    let esiste: boolean = this.master.some(
      (i: { gruppo_punti_id: string; girone: string;}) =>
        i.gruppo_punti_id == e.evento_girone.id_gruppo_punti  
        && i.girone==e.girone);

    if (esiste) {
      console.log("già esiste")
      this.loading_btn = false
      return;
    }
    let payload = {
      id_comp: this.id_comp,
      tipo_evento: this.step_view,
      view: e.evento_girone.descrizione+" "+ e.girone,
      gruppo_evento: e.evento_girone.id_gruppo_punti,
      girone: e.girone
    }
    this.setEventMaster(payload)
  }


  getSquadreComp(input: string) {

    this.adminEventi.getSquadreComp(input)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.squadre = result.compresi
          this.gironi_disponibili = [...new Set(this.squadre.map((i: { girone: any; }) => i.girone))];
console.log("this.gironi_disponibili",this.gironi_disponibili)
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }


  getSchedaMaster() {

    this.adminEventi.getSchedaMaster(this.id_comp.toString())
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.master = result
          console.log("this.master", this.master)

        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }

  setEventMaster(payload: any) {

    this.adminEventi.setEventMaster(payload)
      .subscribe({

        next: (result: any) => {
          this.getSchedaMaster()

        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }

  getTipiPronostici() {

    this.adminEventi.getTipiPronostici(this.id_comp.toString())
      .subscribe({

        next: (result: any) => {
          this.eventi_antepost = result.filter((i: { id_tipo: any; }) => i.id_tipo == this.TIPO_EVENTO.ANTEPOST)||[];
          this.eventi_girone = result.filter((i: { id_tipo: any; }) => i.id_tipo == this.TIPO_EVENTO.GIRONE)||[];
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }


}