import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { EventoScheda } from 'src/app/model/EventoScheda';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/applicazione/confirm-dialog.service';
import { PlayerService } from 'src/app/servizi/player/player.service';


@Component({
  selector: 'schede-utenti',
  templateUrl: './schede-utenti.component.html',
  styleUrls: ['./schede-utenti.component.scss']
})
export class SchedeUtentiComponent extends vrs implements OnInit {

  constructor(
    private player: PlayerService,
    private confirmDialogService: ConfirmDialogService,
    private alert: AlertService) {
    super();
  }

  comboScheda:any
  scheda_master: Array<EventoScheda> = [];
  schede:any
  play_comp = this.player.getCompetizione()

  ngOnInit() {
  this.loading_page = true
    this.getSchedaMaster()
    this.getComboScheda()
    this.getSchedeUtente()
  }

 
  onCopyScheda(){
    this.loading_btn=true
  }

  onRandomScheda(){
    this.loading_btn=true
  }

  onDeleteItem(item: any) {

    this.confirmDialogService.confirmGeneric(() => {
      this.delSchedaUtente(item)
    })
  }

delSchedaUtente(item: any){
  console.log("delSchedaUtente",item)
}

onUpdate(item: any){
  this.getDettaglioScheda(item.id)
}

getSchedaMaster() {

  this.player.getSchedaMaster(this.play_comp.id)
    .pipe(finalize(() =>
      this.loading_page = this.comboScheda? false:true
    ))
    .subscribe({

      next: (result: any) => {
        this.scheda_master = result
      },
      error: (error: any) => {
        this.alert.error(error);
      }
    })

}

  getComboScheda() {

    this.player.getComboScheda(this.play_comp.id)
      .pipe(finalize(() =>
        this.loading_page = this.scheda_master? false:true
      ))
      .subscribe({

        next: (result: any) => {
          this.comboScheda = result
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  getSchedeUtente() {

    this.loading_page = true

    this.player.getSchedeUtente(this.play_comp.id)
      .pipe(finalize(() =>
        this.loading_page = false
      ))
      .subscribe({

        next: (result: any) => {
          this.schede = result
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  getDettaglioScheda(input: string) {
  
    this.player.getDettaglioScheda(input)
      .subscribe({
  
        next: (result: any) => {
          this.scheda_master = result
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  
  }

}
