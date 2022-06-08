import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SUCCESS_OK } from 'src/app/classi/costanti';
import { vrs } from 'src/app/classi/global-variables';
import { AdminDatiService } from 'src/app/servizi/admin/admin-dati.service';
import { AlertService } from 'src/app/servizi/applicazione/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/applicazione/confirm-dialog.service';

@Component({
  selector: 'cannonieri',
  templateUrl: './cannonieri.component.html',
  styleUrls: ['./cannonieri.component.scss']
})
export class CannonieriComponent extends vrs implements OnInit {

  cannonieri: any = []

  constructor(
    private adminDati: AdminDatiService,
    private confirmDialogService: ConfirmDialogService,
    private alert: AlertService) {
    super();
  }

  ngOnInit() {
    this.getCannonieri()
  }


  getCannonieri() {

    this.adminDati.getCannonieri()

      .subscribe({

        next: (result: any) => {
          this.cannonieri = result
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }


  setCannoniere(payload: any) {

    this.loading_btn = true

    this.adminDati.setCannoniere(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS_OK);
          this.getCannonieri()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  onDeleteItem(item: any) {

    this.confirmDialogService.confirmGeneric(() => {
      this.delCannoniere(item)
    })
  }


  delCannoniere(payload: any) {

    this.adminDati.delCannoniere(payload)
      .subscribe({

        next: (result: any) => {
          this.alert.success(SUCCESS_OK);
          this.getCannonieri()
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

}
