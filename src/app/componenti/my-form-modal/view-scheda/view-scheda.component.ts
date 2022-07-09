import { Component, Input, OnInit } from '@angular/core';
import { vrs } from 'src/app/classi/global-variables';
import { EventoScheda } from 'src/app/model/EventoScheda';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { PlayerService } from 'src/app/servizi/player/player.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'view-scheda',
  templateUrl: './view-scheda.component.html',
  styleUrls: ['./view-scheda.component.scss']
})
export class ViewScheda extends vrs {

  constructor(
    private player: PlayerService,
    private alert: AlertService) {
    super();
  }

  @Input() record!: any;
  scheda_master: Array<EventoScheda> = [];


  ngOnChanges() {
    console.log(this.record)
    this.scheda_master = []
    this.loading_page = true
    if(this.record)
    this.getDettaglioScheda(this.record.id)
  }

  getDettaglioScheda(input: string) {

    this.player.getDettaglioScheda(input)
      .pipe(finalize(() =>
        this.loading_page = false
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

}
