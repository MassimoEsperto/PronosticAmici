import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SUCCESS_OK } from 'src/app/classi/costanti';
import { vrs } from 'src/app/classi/global-variables';
import { EventoScheda } from 'src/app/model/EventoScheda';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/applicazione/confirm-dialog.service';
import { PlayerService } from 'src/app/servizi/player/player.service';


@Component({
  selector: 'schede-sbloccate',
  templateUrl: './schede-sbloccate.component.html',
  styleUrls: ['./schede-sbloccate.component.scss']
})
export class SchedeSbloccateComponent extends vrs implements OnInit {


  constructor(
    private player: PlayerService,
    private confirmDialogService: ConfirmDialogService,
    private alert: AlertService) {
    super();
  }

  comboScheda:any
  scheda_master: Array<EventoScheda> = [];
  schede:any
  scheda_selezionata:number=0
  play_comp = this.player.getCompetizione()

  ngOnInit() {
  this.loading_page = true
  this.loading_table = true
  
    this.getSchedaMaster()
    this.getComboScheda()
    this.getSchedeUtente()
  }

 
  onCopyScheda(){
    this.loading_btn=true
  }

  onRandomScheda(){
    
  }

  onDeleteItem(item: any) {

    this.confirmDialogService.confirmGeneric(() => {
      this.delSchedaUtente(item)
    })
  }

  onCopyItem(item: any) {

    this.confirmDialogService.confirmThis("Sei sicuro di copiare la scheda ?",() => {
      this.copySchedaUtente(item)
    })
  }

delSchedaUtente(item: any){
  console.log("delSchedaUtente",item)
}

copySchedaUtente(item: any){
  this.copyDettaglioScheda(item.id)
}

onUpdate(item: any){
  this.scheda_selezionata=item.id
  this.getDettaglioScheda(item.id)
}

onInsert(){
  this.scheda_selezionata=0
  this.getSchedaMaster()
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

    this.player.getSchedeUtente(this.play_comp.id)
      .pipe(finalize(() =>
        this.loading_table = false
      ))
      .subscribe({

        next: (result: any) => {
          this.schede = result
          console.log("this.schede",this.schede)
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

  copyDettaglioScheda(id_scheda:any) {

    this.loading_table= true
    this.player.copyDettaglioScheda(this.play_comp.id,id_scheda)
      .pipe(finalize(() =>
          this.getSchedeUtente()
      ))
      .subscribe({
  
        next: (result: any) => {
          this.alert.success(SUCCESS_OK)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  
  }

}
