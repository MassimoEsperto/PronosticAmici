import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { vrs } from 'src/app/classi/global-variables';
import { AdminDatiService } from 'src/app/servizi/admin/admin-dati.service';

@Component({
  selector: 'squadre',
  templateUrl: './squadre.component.html',
  styleUrls: ['./squadre.component.scss']
})
export class SquadreComponent extends vrs implements OnInit {

  squadre: any = []

  constructor(private adminDati: AdminDatiService) {
    super();
  }

  ngOnInit() {
    this.getSquadre()
  }


  getSquadre() {

    this.adminDati.getSquadre()
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.squadre = result
          console.log("teams", this.squadre)
        },
        error: (error: any) => {
          // this.alert.error(error);
        }
      })

  }


  setSquadra(payload: any) {

    this.adminDati.setSquadra(payload)
      .pipe(finalize(() =>
      this.getSquadre()
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
