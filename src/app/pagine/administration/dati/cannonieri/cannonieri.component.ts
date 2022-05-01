import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { AdminDatiService } from 'src/app/servizi/admin/admin-dati.service';

@Component({
  selector: 'cannonieri',
  templateUrl: './cannonieri.component.html',
  styleUrls: ['./cannonieri.component.scss']
})
export class CannonieriComponent extends vrs implements OnInit {

  cannonieri: any = []

  constructor(private adminDati: AdminDatiService) {
    super();
  }

  ngOnInit() {
    this.getCannonieri()
  }


  getCannonieri() {

    this.adminDati.getCannonieri()
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.cannonieri = result
          console.log("cannonieri", this.cannonieri)
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }


  setCannoniere(payload: any) {

    this.adminDati.setCannoniere(payload)
      .pipe(finalize(() =>
      this.getCannonieri()
      ))
      .subscribe({

        next: (result: any) => {
          //alert ok
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }

}
