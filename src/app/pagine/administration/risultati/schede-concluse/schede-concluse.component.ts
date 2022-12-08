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
  selector: 'schede-concluse',
  templateUrl: './schede-concluse.component.html',
  styleUrls: ['./schede-concluse.component.scss']
})
export class SchedeConcluseComponent extends vrs implements OnInit {

  @Input() comp!: Competizione;
  cannonieri: any = [];
  squadre: any = [];

  constructor(
    private util: UtilService,
    private admin: AdminRisultatiService,
    private confirmDialogService: ConfirmDialogService,
    private alert: AlertService) {
    super();
  }


  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.comp && this.comp.id) {
      this.getSchedeConcluse(this.comp.id)
    }
  }

  getSchedeConcluse(id: string) {

    this.loading_page = true

    this.admin.getSchedeConcluse(id)
      .pipe(finalize(() =>
        (this.loading_page = false,
        this.loading_btn = false)
      ))
      .subscribe({

        next: (result: any) => {

          this.cannonieri = result.filter((i: { gruppo: number }) => i.gruppo == this.GRUPPO_PUNTI.CAPOCANNONIERE)

          this.squadre = result.filter((i: { gruppo: number }) => i.gruppo == this.GRUPPO_PUNTI.VINCENTE_TORNEO)

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

 setSchedeConcluse(payload: any) {

    this.admin.setSchedeConcluse(payload)
      .pipe(finalize(() =>
        this.getSchedeConcluse(this.comp.id || "")
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

  onSchedeConcluse(item: any) {
    
    let can = this.listaConcluse(item.cannoniere);
    let scq = this.listaConcluse(item.squadra);

    let tot = can.concat(scq);

    let schedine = tot.filter((item: any, pos: any) => tot.indexOf(item) != pos)

    let payload = {schedine:schedine}

    this.setSchedeConcluse(payload)
  }

  listaConcluse(item: any) {
    let tmp: any = [];

    for (let ele of item) {
      tmp = tmp.concat(ele.schedine);
    }

    return tmp;
  }

}
