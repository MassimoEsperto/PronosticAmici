import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { EventoScheda } from 'src/app/model/EventoScheda';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { PlayerService } from 'src/app/servizi/player/player.service';

@Component({
  selector: 'form-scheda',
  templateUrl: './form-scheda.component.html',
  styleUrls: ['./form-scheda.component.scss']
})
export class FormScheda extends vrs implements OnInit {


  @Input() combo!: any;
  @Input() scheda_selezionata: number=0;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @Input() scheda_master: Array<EventoScheda> = [];
  @Output() submit = new EventEmitter();
  play_comp = this.player.getCompetizione()


  constructor(
    private player: PlayerService,
    private alert: AlertService) {
    super();
  }

  ngOnInit() {}

  ngOnChanges() {
    
  }


  onChangeGruppo(event: any, record: any) {

    let ele = event.target.value['0']

    //nel caso non ci sia un girone completo
    let completo = this.scheda_master.find((i: { tipo: number, girone: string, gruppo: number }) => i.tipo == this.TIPO_EVENTO.GIRONE && i.girone == record.girone && i.gruppo == this.GRUPPO_PUNTI.GIRONE_COMPLETO)
    if (!completo) return

    completo.valore = ''

    //lista di prima seconda ecc
    let lista = this.scheda_master.filter((i: { tipo: number, girone: string, gruppo: number }) => i.tipo == this.TIPO_EVENTO.GIRONE && i.girone == record.girone && i.gruppo != this.GRUPPO_PUNTI.GIRONE_COMPLETO)

    //nel caso qualche campo non sia stato valorizzato tipo prima girone seconda ecc
    let is_da_valorizzare = lista.some((i: { valore: string }) => !i.valore)

    if (!is_da_valorizzare) {
      let tmp: any[] = []
      let sigle = "";
      let sep = "";
      for (let ele of lista) {
        if (ele.valore && !tmp.some((i) => i == ele.valore)) {
          tmp.push(ele.valore)
          let sigla = this.combo.squadre_girone[record.girone].find((i: { descrizione: string }) => i.descrizione==ele.valore).sigla
          sigle = sigle + sep + sigla
          sep = "-"
        }
      }

      //nel caso tutto sia andato a buon fine
      if (lista.length == tmp.length) {
        completo.valore = sigle
      }
    }
  }



  onPlayScheda(input: Array<EventoScheda>) {

    console.log(input)

    this.loading_btn = true

    if(this.scheda_selezionata>0){
      this.updDettaglioScheda(input)
    }else{
      this.setDettaglioScheda(input)
    }

  }



  updDettaglioScheda(input: Array<EventoScheda>) {


    this.player.updDettaglioScheda(input)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.closeModal.nativeElement.click()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }


  setDettaglioScheda(input: Array<EventoScheda>) {

    this.player.setDettaglioScheda(input)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.closeModal.nativeElement.click()
          this.submit.emit()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }




}
