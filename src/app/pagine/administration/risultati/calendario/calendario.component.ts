import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SUCCESS_OK } from 'src/app/classi/costanti';
import { vrs } from 'src/app/classi/global-variables';
import { Competizione } from 'src/app/model/Competizione';
import { AdminRisultatiService } from 'src/app/servizi/admin/admin-risultati.service';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/applicazione/confirm-dialog.service';
import { UtilService } from 'src/app/servizi/applicazione/util.service';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent extends vrs implements OnInit {

  comboScheda: any
  scheda_risultati: any = [];
  @Input() comp!: Competizione;


  constructor(
    private util: UtilService,
    private admin: AdminRisultatiService,
    private confirmDialogService: ConfirmDialogService,
    private alert: AlertService) {
    super();
  }


  ngOnInit() { }

  ngOnChanges() {
    if (this.comp && this.comp.id) {
      this.getSchedaRisultati(this.comp.id)
      this.getComboScheda(this.comp.id)
    }

  }


  viewRisultato(items: any) {

    let view: string = "";
    let sep = ""
    for (let ele of items) {
      view = view + sep + ele;
      sep = " \n"
    }

    return view
  }

  onUpdatePartita(item: any, id_evento: number) {

    let payload = {
      "view": item.risultato.view,
      "id_evento": id_evento,
      "valore": item.risultato.valore
    }

    this.setRisultatoPartita(payload)
  }

  onUpdateAntepost(item: any, evento: any) {

    let payload = {
      "punti": evento.punti,
      "id_evento": evento.id,
      "valore": item.risultato
    }
    this.setRisultatoAntepost(payload)

  }

  onUpdateGirone(item: any, evento: any) {

    let payload = {
      "punti": evento.punti,
      "id_evento": evento.id,
      "valore": item.risultato
    }
    this.setRisultatoGironi(payload)

  }

  onUpdateGironeCompleto(item: any, evento: any, numero: number) {

    let sigla = "";
    let sep = "";
    for (let i = 0; i < numero; i++) {
      sigla += sep + item['risultato' + i]
      sep = "-"
    }

    let payload = {
      "punti": evento.punti,
      "id_evento": evento.id,
      "valore": sigla
    }

    this.setRisultatoGironi(payload)

  }

  onUpdateTabellone(item: any, id_evento: number) {

    let payload = {
      "view": item.risultato.view,
      "id_evento": id_evento,
      "valore": item.risultato.valore
    }

    this.setRisultatoEliminatorie(payload)
  }


  setRisultatoPartita(payload: any) {

    this.admin.setRisultatoPartita(payload)
      .pipe(finalize(() =>
        this.getSchedaRisultati(this.comp.id || "")
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS_OK);
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  setRisultatoEliminatorie(payload: any) {

    this.admin.setRisultatoEliminatorie(payload)
      .pipe(finalize(() =>
        this.getSchedaRisultati(this.comp.id || "")
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS_OK);
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  setRisultatoAntepost(payload: any) {

    this.admin.setRisultatoAntepost(payload)
      .pipe(finalize(() =>
        this.getSchedaRisultati(this.comp.id || "")
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS_OK);
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  setRisultatoGironi(payload: any) {

    this.admin.setRisultatoGironi(payload)
      .pipe(finalize(() =>
        this.getSchedaRisultati(this.comp.id || "")
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS_OK);
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  getSchedaRisultati(id: string) {

    this.admin.getSchedaRisultati(id)
      .pipe(finalize(() =>
        this.loading_page = this.comboScheda ? false : true
      ))
      .subscribe({

        next: (result: any) => {
          this.scheda_risultati = result
          this.loading_btn = false;
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  getComboScheda(id: string) {

    this.admin.getRisultatiPossibili(id)
      .pipe(finalize(() =>
        this.loading_page = this.scheda_risultati ? false : true
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


}
