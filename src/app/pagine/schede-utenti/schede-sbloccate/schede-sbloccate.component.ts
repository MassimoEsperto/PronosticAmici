import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SUCCESS_OK } from 'src/app/classi/costanti';
import { vrs } from 'src/app/classi/global-variables';
import { EventoScheda } from 'src/app/model/EventoScheda';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/applicazione/confirm-dialog.service';
import { UtilService } from 'src/app/servizi/applicazione/util.service';
import { PlayerService } from 'src/app/servizi/player/player.service';


@Component({
  selector: 'schede-sbloccate',
  templateUrl: './schede-sbloccate.component.html',
  styleUrls: ['./schede-sbloccate.component.scss']
})
export class SchedeSbloccateComponent extends vrs implements OnInit {


  constructor(

    private util: UtilService,
    private player: PlayerService,
    private confirmDialogService: ConfirmDialogService,
    private alert: AlertService) {
    super();
  }

  comboScheda: any
  scheda_master: Array<EventoScheda> = [];
  schede: any
  scheda_selezionata: number = 0
  play_comp = this.player.getCompetizione()

  ngOnInit() {
    this.loading_page = true
    this.loading_table = true

    this.getSchedaMaster()
    this.getComboScheda()
    this.getSchedeUtente()
  }


  onCopyScheda() {
    this.loading_btn = true
  }

  onRandomScheda() {
    this.scheda_master = []
    this.scheda_selezionata = 0
    this.getSchedaRandom()

  }

  onDeleteItem(item: any) {

    this.confirmDialogService.confirmThis("Sei sicuro di eliminare la scheda ?", () => {
      this.delDettaglioScheda(item)
    })
  }

  onCopyItem(item: any) {

    this.confirmDialogService.confirmThis("Sei sicuro di copiare la scheda ?", () => {
      this.copySchedaUtente(item)
    })
  }


  copySchedaUtente(item: any) {
    this.copyDettaglioScheda(item.id)
  }

  onUpdate(item: any) {
    this.scheda_selezionata = item.id
    this.scheda_master = []
    this.getDettaglioScheda(item.id)
  }

  onInsert() {
    this.scheda_selezionata = 0
    this.scheda_master = []
    this.getSchedaMaster()
  }



  getSchedaMaster() {

    this.player.getSchedaMaster(this.play_comp.id)
      .pipe(finalize(() =>
        this.loading_page = this.comboScheda ? false : true
      ))
      .subscribe({

        next: (result: any) => {
          this.scheda_master = result
          console.log(this.scheda_master)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  getComboScheda() {

    this.player.getComboScheda()
      .pipe(finalize(() =>
        this.loading_page = this.scheda_master ? false : true
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

  getSchedeUtenteReload() {
    this.alert.success(SUCCESS_OK)
    this.getSchedeUtente()
  }

  getSchedeUtente() {

    this.player.getSchedeUtente()
      .pipe(finalize(() =>
        this.loading_table = false
      ))
      .subscribe({

        next: (result: any) => {
          this.schede = result
          console.log("this.schede", this.schede)
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

  copyDettaglioScheda(id_scheda: any) {

    this.loading_table = true
    this.player.copyDettaglioScheda(id_scheda)
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

  delDettaglioScheda(scheda: any) {

    this.loading_table = true
    this.player.delDettaglioScheda(scheda)
      .pipe(finalize(() =>
        this.getSchedeUtente()
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS_OK)
          this.idxTable=this.idxTable==this.schede.table.length-1&&this.idxTable!=0?this.idxTable-1:this.idxTable
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  getSchedaRandom() {

    this.player.getSchedaRandom(this.play_comp.id)

      .subscribe({

        next: (result: any) => {
          this.scheda_master = result
          console.log(this.scheda_master)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }





}
